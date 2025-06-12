// src/pages/api/screen.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing OpenAI API key' });
  }

  const { resumeText, jobDescription } = req.body;
  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: 'Missing resume or job description' });
  }

  const prompt = `You are an AI HR assistant...`;

  try {
    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3
      })
    });

    const data = await aiRes.json();
    if (!aiRes.ok) {
      return res.status(aiRes.status).json({ error: data });
    }

    const result = data.choices?.[0]?.message?.content.trim() || '';
    return res.status(200).json({ result });
  } catch (err) {
    console.error('OpenAI Error:', err);
    return res.status(500).json({ error: 'OpenAI request failed' });
  }
}
