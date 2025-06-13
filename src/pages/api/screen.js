// /pages/api/screen.js
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

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/chat-bison-001:generateMessage?key=AIzaSyAV9DMDE2QLwjNypsoPAo6UhG9te4fO4Qk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: {
          messages: [{ content: prompt, author: 'user' }],
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ message: data.error?.message || 'Failed to analyze resume' });
    }

    const aiMessage = data.candidates?.[0]?.content || 'No response received.';
    res.status(200).json({
      result: {
        summary: aiMessage,
        score: 'N/A', // You can parse for a number if needed
      },
    });
  } catch (error) {
    console.error('Error in API:', error.message);
    res.status(500).json({ message: 'Internal error', error: error.message });
  }
}
