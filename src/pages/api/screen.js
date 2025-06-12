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
Compare the resume to the job description and respond with JSON in this format:

\`\`\`json
{
  "review": "[brief analysis]",
  "score": 85,
  "recommendation": "[advice or next steps]"
}
\`\`\`

Resume:
${resume}

Job Description:
${job}
`;

  try {
    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
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

    if (!aiRes.ok) {
      const errBody = await aiRes.json().catch(() => ({}));
      return res.status(aiRes.status).json({ error: errBody });
    }

    const payload = await aiRes.json();
    let text = payload.choices[0].message.content;
    text = text.replace(/```(?:json)?/g, '').trim();

    const result = JSON.parse(text);
    return res.status(200).json(result);
  } catch (err) {
    console.error('OpenAI Error:', err);
    return res.status(500).json({ error: 'Resume analysis failed' });
  }
}
