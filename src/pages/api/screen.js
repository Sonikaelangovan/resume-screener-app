// pages/api/screen.js
import formidable from 'formidable';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import axios from 'axios';

export const config = {
  api: {
    bodyParser: false, // Required for formidable
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ error: 'Form parsing failed' });
    }

    try {
      const job = fields.job;
      const filePath = files.resume.filepath;

      const dataBuffer = fs.readFileSync(filePath);
      const parsedPdf = await pdfParse(dataBuffer);
      const resumeText = parsedPdf.text;

      const prompt = `
You are an AI HR assistant. Compare the resume with the job description and provide a short review and a match percentage.

Resume:
${resumeText}

Job Description:
${job}

Reply format:
Review: <your analysis>
Match Score: <number>%`;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const result = response.data.choices[0]?.message?.content || 'No response from AI.';
      return res.status(200).json({ result });

    } catch (error) {
      console.error('Processing error:', error);
      return res.status(500).json({ error: 'Resume analysis failed' });
    }
  });
}
