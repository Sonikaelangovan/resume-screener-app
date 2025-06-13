import { useState } from 'react';

export default function ResumeUpload() {
  const [resumeText, setResumeText] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobDesc.trim()) {
      alert('Please paste both resume text and job description.');
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          jobDescription: jobDesc,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to analyze');
      }

      setResult(data.result);
    } catch (err) {
      console.error(err);
      setResult('Failed to analyze. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
      <h2>AI Resume Screener</h2>

      <textarea
        placeholder="Paste resume text..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        rows={8}
        style={{ width: '100%', marginBottom: '1rem' }}
      />

      <textarea
        placeholder="Paste job description..."
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        rows={6}
        style={{ width: '100%' }}
      />

      <button onClick={handleAnalyze} disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? 'Analyzing...' : 'Analyze Resume'}
      </button>

      {result && (
        <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
          <h3>AI Review</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
