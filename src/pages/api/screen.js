export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ message: 'Missing resumeText or jobDescription' });
  }

  try {
    const prompt = `Evaluate this resume:\n\n${resumeText}\n\nFor this job description:\n\n${jobDescription}\n\nGive a suitability score (0-100) and a short explanation.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta1/models/chat-bison-001:generateMessage?key=${process.env.PALM_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              author: 'user',
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('PaLM API error:', data);
      return res.status(500).json({ message: data.error?.message || 'Failed to analyze resume' });
    }

    const aiMessage = data.candidates?.[0]?.content || 'No response received.';
    res.status(200).json({
      result: {
        summary: aiMessage,
        score: 'N/A',
      },
    });
  } catch (error) {
    console.error('Error in /screen API:', error.message);
    res.status(500).json({ message: 'Internal error', error: error.message });
  }
}
