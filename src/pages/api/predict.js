// /pages/api/predict.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "OpenAI API key not configured" });
  }

  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: "Missing resume or job description" });
  }

  try {
    const prompt = `
You are an AI resume screener. Given the following resume and job description, provide a detailed analysis of how well the candidate fits the role. Be specific and objective.

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      }),
    });

    const data = await openaiRes.json();

    if (openaiRes.status !== 200 || !data.choices) {
      return res.status(500).json({ error: "OpenAI API call failed", details: data });
    }

    const result = data.choices[0].message.content.trim();
    res.status(200).json({ result });

  } catch (error) {
    console.error("Prediction error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
