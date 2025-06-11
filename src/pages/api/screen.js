// pages/api/screen.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { resume, job } = req.body;

  const prompt = `
You're an AI HR assistant. Analyze the following resume against the job description and give a short review and a match percentage.

Resume:
${resume}

Job Description:
${job}

Reply format:
Review: <your analysis>
Match Score: <number>%`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = response.data.choices[0].message.content;
    res.status(200).json({ result });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to connect to AI API' });
  }
}
