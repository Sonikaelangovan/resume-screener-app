import React, { useState } from 'react';

const ResumeStats = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [lastChecked, setLastChecked] = useState('');

  const handleFileChange = (e) => {
    setUploadedFiles([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (uploadedFiles.length > 0) {
      setLastChecked(new Date().toLocaleString());
    }
  };

  const simulateUpload = () => {
    setLastChecked(new Date().toLocaleString());
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="uploadForm">
        <div style={{ border: '2px dashed #a855f7', padding: '2rem', textAlign: 'center' }}>
          <p>Drag & drop your resume here, or click to select</p>
          <label htmlFor="file-upload" style={{ cursor: 'pointer', color: '#7c3aed', fontWeight: 'bold' }}>
            Select File
          </label>
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            multiple
          />
          {uploadedFiles.length > 0 && (
            <div style={{ marginTop: '1rem', backgroundColor: '#f3e8ff', padding: '0.5rem' }}>
              {Array.from(uploadedFiles).map((file, idx) => (
                <p key={idx}>📄 {file.name}</p>
              ))}
            </div>
          )}
        </div>

        <button type="submit" style={{
          marginTop: '1rem',
          backgroundColor: '#a855f7',
          color: '#fff',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Analysis
        </button>
      </form>

      <section className="stats-section" style={{ marginTop: '2rem', backgroundColor: '#a855f7',
          color: '#fff' }}>
        <h3>Resume Stats</h3>
        <p>Total Resumes Uploaded: {uploadedFiles.length}</p>
        <p>Last Checked: {lastChecked || '—'}</p>
        <button
          onClick={simulateUpload}
          style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
        </button>
      </section>
    </div>
  );
};

export default ResumeStats;
