import React, { useEffect, useState } from 'react';

const ResumeStats = () => {
  const [resumeCount, setResumeCount] = useState(0);
  const [lastChecked, setLastChecked] = useState('');

  useEffect(() => {
    const uploadInput = document.getElementById('file-upload'); // ID of your actual upload input
    const submitBtn = document.getElementById('submitBtn'); // Button that triggers the upload

    const updateStats = () => {
      const files = uploadInput?.files;
      if (files && files.length > 0) {
        setResumeCount(files.length);
        setLastChecked(new Date().toLocaleString());
      }
    };

    submitBtn?.addEventListener('click', updateStats);

    return () => {
      submitBtn?.removeEventListener('click', updateStats);
    };
  }, []);

  return (
    <section className="stats-section" style={{ marginTop: '2rem' }}>
      <h3>Resume Stats</h3>
      <p>Total Resumes Uploaded: {resumeCount}</p>
      <p>Last Checked: {lastChecked || '—'}</p>
      <button onClick={() => {
        const files = document.getElementById('file-upload')?.files;
        setResumeCount(files?.length || 0);
        setLastChecked(new Date().toLocaleString());
      }}>
        Simulate Upload
      </button>
    </section>
  );
};

export default ResumeStats;
