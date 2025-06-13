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
    // Replace with your own Google-style AI endpoint
    const response = await fetch('https://gemini.google.com/app?is_sa=1&is_sa=1&android-min-version=301356232&ios-min-version=322.0&campaign_id=bkws&utm_source=sem&utm_source=google&utm_medium=paid-media&utm_medium=cpc&utm_campaign=bkws&utm_campaign=2024enIN_gemfeb&pt=9008&mt=8&ct=p-growth-sem-bkws&gad_source=1&gad_campaignid=20357620749&gbraid=0AAAAApk5BhmUBMnKuW5q9CCHE526Aolpc&gclid=CjwKCAjw9anCBhAWEiwAqBJ-c6iE_SdKWG-Ap0p_eNWRUAeCNH2DY0vSvIAgLXMp9Q05L49ydTJhORoCFu4QAvD_BwE&gclsrc=aw.ds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.Gemini_API}`, // Using your Google-style key
      },
      body: JSON.stringify({
        resumeText,
        jobDescription,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ message: data.error?.message || 'Failed to analyze resume' });
    }

    res.status(200).json({ result: data.result || data });
  } catch (error) {
    res.status(500).json({ message: 'Error analyzing resume', error: error.message });
  }
}
