import React, { useState } from 'react';

export default function ResumeUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [lastChecked, setLastChecked] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
    setDragOver(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      alert(`Uploading: ${selectedFile.name}`);
      // In a real application, you'd send the file to an API or backend here
      setLastChecked(new Date().toLocaleString()); // Update last checked time
    } else {
      alert('Please select a resume to upload.');
    }
  };

  return (
    <div className="upload-section" style={{ maxWidth: '600px', margin: '2rem auto', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '1.5rem' }}>Upload Your Resume</h2>
      <form onSubmit={handleSubmit}>
        <div
          className={`file-upload ${dragOver ? 'drag-over' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            border: `2px dashed ${dragOver ? '#7c3aed' : '#a855f7'}`,
            padding: '2.5rem',
            textAlign: 'center',
            borderRadius: '8px',
            backgroundColor: `${dragOver ? '#f3e8ff' : '#f9f9f9'}`,
            transition: 'background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',
          }}
        >
          <i className="fas fa-cloud-upload-alt" style={{ fontSize: '3rem', color: '#a855f7', marginBottom: '1rem' }}></i>
          <p style={{ margin: '0.5rem 0', color: '#555' }}>Drag & drop your resume here, or click to select</p>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="fileInput"
          />
          <label htmlFor="fileInput" style={{ cursor: 'pointer', color: '#7c3aed', fontWeight: 'bold', textDecoration: 'underline' }}>
            Select File
          </label>
        </div>

        {selectedFile && (
          <div className="file-list" style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#eef', border: '1px solid #dde', borderRadius: '6px' }}>
            <div className="file-item" style={{ display: 'flex', alignItems: 'center' }}>
              <i className="fas fa-file-alt" style={{ marginRight: '0.5rem', color: '#a855f7' }}></i>
              <span style={{ fontWeight: '500', color: '#333' }}>{selectedFile.name}</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="btn-primary"
          style={{
            marginTop: '1.5rem',
            backgroundColor: '#a855f7',
            color: '#fff',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            width: '100%',
            transition: 'background-color 0.2s ease-in-out',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#7c3aed'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#a855f7'}
        >
          Analysis
        </button>
      </form>

      <div className="stats-section" style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#a855f7', color: '#fff', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>Resume Upload Status</h3>
        <p style={{ margin: '0.5rem 0' }}>
          Total Resumes Uploaded: <strong style={{color: '#ffe'}}>{selectedFile ? 1 : 0}</strong>
        </p>
        <p style={{ margin: '0.5rem 0' }}>
          Last Checked: <strong style={{color: '#ffe'}}>{lastChecked || 'Not yet checked'}</strong>
        </p>
      </div>
    </div>
  );
}
