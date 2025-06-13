import { useState } from 'react';

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
  const res = await fetch('/api/screen', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      resumeText: 'Paste your parsed resume text here',
      jobDescription: 'Paste the job description here',
    }),
  });

  const data = await res.json();
  if (res.ok) {
    console.log("AI Result:", data.result);
  } else {
    console.error("Error:", data.error);
  }
};


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!file || !jobDesc.trim()) {
      alert('Please upload a resume and enter a job description.');
      return;
    }

    setLoading(true);
    setResult('');

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('job', jobDesc);

    try {
      const res = await fetch('/api/screen', { method: 'POST', body: formData });
      const json = await res.json();
      if (json.error) {
        throw new Error(json.error);
      }
      setResult(json.result);
    } catch (err) {
      console.error(err);
      setResult('Failed to analyze. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
      <h2>Resume Screener</h2>

      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />

      <textarea
        placeholder="Paste job description..."
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        rows={6}
        style={{ width: '100%', marginTop: '1rem' }}
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
