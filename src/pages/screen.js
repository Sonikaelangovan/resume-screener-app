// pages/screen.js
import React, { useState } from 'react';

export default function Screen() {
  const [file, setFile] = useState(null);
  const [job, setJob] = useState('');
  const [review, setReview] = useState('');
  const [score, setScore] = useState(null);
  const [recommendation, setRecommendation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file || !job.trim()) {
      setError('Resume and job description are required.');
      return;
    }
    setLoading(true);
    setError('');

    const reader = new FileReader();
    reader.onload = async () => {
      const resumeText = reader.result;
      try {
        const res = await fetch('/api/screen', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resume: resumeText, job }),
        });
        const data = await res.json();
        if (res.ok) {
          setReview(data.review);
          setScore(data.score);
          setRecommendation(data.recommendation);
        } else {
          setError(data.error || 'Analysis error.');
        }
      } catch (err) {
        setError('Network error.');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
      <h1>Resume Screener</h1>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <textarea
        placeholder="Paste job description..."
        value={job}
        onChange={(e) => setJob(e.target.value)}
        rows={6}
        style={{ width: '100%', marginTop: '1rem' }}
      />
      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{ marginTop: '1rem' }}
      >
        {loading ? 'Analyzing...' : 'Analyze Resume'}
      </button>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {review && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Review</h2>
          <p>{review}</p>
          <p><strong>Match Score: </strong>{score}%</p>
          <h3>Recommendation</h3>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
}
