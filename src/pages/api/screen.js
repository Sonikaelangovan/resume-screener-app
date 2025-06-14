export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { resumeText, jobDescription } = req.body;

  // Validate input
  if (!resumeText || !jobDescription) {
    return res.status(400).json({ message: 'Missing resumeText or jobDescription' });
  }

  // Build the prompt
  const prompt = `
Evaluate the following resume for suitability to the job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Provide a short summary of the candidate's fit, strengths/weaknesses, and give a compatibility score from 0 to 100.
  `.trim();

  try {
    const apiKey = process.env.PALM_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ message: 'Missing PaLM API key in environment variables.' });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta1/models/chat-bison-001:generateMessage?key=${apiKey}`;

    // Send request to PaLM API
    const response = await fetch(apiUrl, {
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
    });

    const data = await response.json();

    // Debug logs for troubleshooting
    console.log('[PaLM API Response]', JSON.stringify(data, null, 2));

    if (!response.ok || data.error) {
      console.error('❌ PaLM API Error:', data.error || data);
      return res.status(500).json({
        message: data.error?.message || 'Failed to analyze resume',
        details: data,
      });
    }

    const aiMessage = data.candidates?.[0]?.content?.trim() || 'No response received from AI.';

    // Return result
    return res.status(200).json({
      result: aiMessage,
    });

  } catch (error) {
    console.error('❌ Server Error in /api/screen:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
