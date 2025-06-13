export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { resumeText, jobDescription } = req.body;
  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: 'Missing resumeText or jobDescription' });
  }

  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

  const prompt = `
Compare the following resume to the job description and respond with:
- Match percentage
- Strengths
- Weaknesses
- Final review

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=${GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: {
            text: prompt,
          },
          temperature: 0.7,
          maxOutputTokens: 500,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || data.error) {
      return res.status(500).json({ error: data.error || 'Google API error' });
    }

    const result = data.candidates?.[0]?.output || 'No result from AI.';
    res.status(200).json({ result });
  } catch (error) {
    console.error('Google API Error:', error);
    return res.status(500).json({ error: 'Failed to connect to Google AI API' });
  }
}
