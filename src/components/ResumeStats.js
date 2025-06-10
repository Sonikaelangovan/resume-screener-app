import { useEffect, useState } from 'react';

const ResumeStats = () => {
  const [resumeCount, setResumeCount] = useState(0);
  const [lastChecked, setLastChecked] = useState('');

  useEffect(() => {
    const updateStats = () => {
      const files = document.getElementById('resumes')?.files;
      if (files && files.length > 0) {
        setResumeCount(files.length);
      }
      const now = new Date();
      setLastChecked(now.toLocaleTimeString());
    };

    const form = document.getElementById('uploadForm');
    form?.addEventListener('submit', updateStats);

    return () => {
      form?.removeEventListener('submit', updateStats);
    };
  }, []);

  return (
    <section className="stats-section">
      <h3>Resume Stats</h3>
      <p>Total Resumes Uploaded: {resumeCount}</p>
      <p>Last Checked: {lastChecked}</p>
      <button onClick={() => {
        const now = new Date();
        setLastChecked(now.toLocaleTimeString());
        const files = document.getElementById('resumes')?.files;
        setResumeCount(files?.length || 0);
      }}>
        Simulate Upload
      </button>
    </section>
  );
};

export default ResumeStats;
