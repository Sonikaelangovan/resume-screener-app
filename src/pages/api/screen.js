// pages/api/screen.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { resume, job } = req.body;

  if (!resume || !job) {
    return res.status(400).json({ error: 'Missing resume or job description' });
  }

  const prompt = `
Compare the resume to the job description and respond with valid JSON in this format:

\`\`\`json
{
  "review": "[brief analysis]",
  "score": 85,
  "recommendation": "[next step advice or improvement]"
}
\`\`\`

Resume:
${resume}

Job Description:
${job}
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      return res.status(response.status).json({ error: errorBody });
    }

    const data = await response.json();
    let content = data.choices[0].message.content;

    // Remove code fences (```json)
    content = content.replace(/```(?:json)?/g, '').trim();

    const result = JSON.parse(content);
    return res.status(200).json(result);
  } catch (err) {
    console.error('OpenAI Error:', err);
    return res.status(500).json({ error: 'Failed to analyze resume' });
  }
}
