// src/pages/api/screen.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed', message: `Only POST requests are allowed on this endpoint.` });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // Log sensitive information only on the server for debugging, not sent to client in detail
    console.error('SERVER_ERROR: Missing OpenAI API key in environment variables.');
    return res.status(500).json({ error: 'Server Configuration Error', message: 'The OpenAI API key is not configured.' });
  }

  const { resumeText, jobDescription } = req.body;
  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: 'Bad Request', message: 'Both resumeText and jobDescription are required.' });
  }

  // Define the prompt for the AI HR assistant
  // Ensure this prompt is robust and handles various inputs
  const prompt = `You are an AI HR assistant. Your task is to analyze a resume and a job description to determine the candidate's suitability.
  Provide a concise summary of the candidate's fit, highlighting key strengths and weaknesses relative to the job description.
  Also, provide a compatibility score out of 100.
  
  Job Description:
  ${jobDescription}

  Resume:
  ${resumeText}

  Please provide your response in a structured JSON format with 'summary' and 'score' fields.
  Example: {"summary": "Candidate has strong...", "score": 85}
  `;

  try {
    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Consider using 'gpt-4' or 'gpt-4o' for better results if budget allows
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3, // Lower temperature for more focused and less random responses
        // max_tokens: 500 // Consider adding max_tokens to control response length
      })
    });

    const data = await aiRes.json();

    if (!aiRes.ok) {
      // Log the full OpenAI error for server-side debugging
      console.error('OpenAI API Error Response:', data);

      // Extract more specific error message from OpenAI if available
      const openaiErrorMessage = data.error?.message || 'Unknown error from OpenAI API.';
      return res.status(aiRes.status).json({
        error: 'OpenAI API Error',
        message: openaiErrorMessage,
        // Optionally, include OpenAI's error type if it helps the client
        type: data.error?.type
      });
    }

    const result = data.choices?.[0]?.message?.content?.trim();

    if (!result) {
      console.error('OpenAI API: No content received from OpenAI completion.');
      return res.status(500).json({ error: 'OpenAI Response Error', message: 'No content received from AI.' });
    }

    // Attempt to parse the JSON response from OpenAI
    let parsedResult;
    try {
      parsedResult = JSON.parse(result);
      // Basic validation for the expected structure
      if (typeof parsedResult.summary !== 'string' || typeof parsedResult.score !== 'number') {
        throw new Error('Parsed JSON does not match expected structure (summary: string, score: number).');
      }
    } catch (parseError) {
      console.error('Error parsing OpenAI response JSON:', parseError, 'Raw response:', result);
      return res.status(500).json({
        error: 'Response Parsing Error',
        message: 'Failed to parse AI response. Expected JSON.',
        rawAIResponse: result // Send raw response for debugging purposes on the client
      });
    }

    return res.status(200).json({ result: parsedResult }); // Send the parsed object
  } catch (err) {
    console.error('SERVER_ERROR: OpenAI request failed:', err); // Log the full error object
    return res.status(500).json({ error: 'Server Error', message: 'An internal server error occurred while processing your request.' });
  }
}
