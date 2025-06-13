// /pages/api/predict.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ message: 'Missing resumeText or jobDescription' });
  }

  try {
    const prompt = `Evaluate this resume:\n\n${resumeText}\n\nFor this job description:\n\n${jobDescription}\n\nGive a suitability rating (0-100) and a short justification.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ message: data.error?.message || 'Failed to analyze resume' });
    }

    const aiMessage = data.choices?.[0]?.message?.content;
    res.status(200).json({ result: aiMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error analyzing resume', error: error.message });
  }
}
