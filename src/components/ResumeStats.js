import React, { useState } from 'react';

const ResumeStats = () => {
  const [resumes, setResumes] = useState([]);
  const [lastChecked, setLastChecked] = useState('');

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setResumes(files);
    setLastChecked(new Date().toLocaleString());
  };

  const handleSimulateUpload = () => {
    setLastChecked(new Date().toLocaleString());
  };

  return (
    <div>
      <form id="uploadForm">
        <input
          type="file"
          id="resumes"
          onChange={handleFileChange}
          multiple
          accept=".pdf,.doc,.docx"
        />
        <button type="submit">Submit</button>
      </form>

      <section className="stats-section">
        <h3>Resume Stats</h3>
        <p>Total Resumes Uploaded: {resumes.length}</p>
        <p>Last Checked: {lastChecked || '—'}</p>
        <button onClick={handleSimulateUpload}>
          Simulate Upload
        </button>
      </section>
    </div>
  );
};

export default ResumeStats;
