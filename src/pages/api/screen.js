// pages/api/screen.js
import formidable from 'formidable';
import fs from 'fs';
import pdfParse from 'pdf-parse'; // to extract text from PDFs

export const config = {
  api: {
    bodyParser: false, // Required for formidable
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Error parsing form data' });

    const jobDesc = fields.job;
    const file = files.resume;

    if (!file || !jobDesc) {
      return res.status(400).json({ error: 'Missing resume or job description' });
    }

    try {
      // Extract text from resume (PDF)
      const dataBuffer = fs.readFileSync(file.filepath);
      const parsed = await pdfParse(dataBuffer);
      const resumeText = parsed.text;

      const prompt = `
You are an AI HR assistant. Compare the resume with the job description and provide a short review and a match percentage.

Resume:
${resumeText}

Job Description:
${jobDesc}

Reply format:
Review: <your analysis>
Match Score: <number>%`;

      const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        }),
      });

      const aiData = await openaiRes.json();
      const result = aiData.choices?.[0]?.message?.content || 'No response from AI.';
      return res.status(200).json({ result });
    } catch (error) {
      console.error('Error:', error.message);
      return res.status(500).json({ error: 'Failed to analyze resume' });
    }
  });
}
