import React, { useState } from 'react';

export default function ResumeUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastChecked, setLastChecked] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) setSelectedFile(file);
    setDragOver(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile || !jobDesc.trim()) {
      alert('Please upload a resume and enter a job description.');
      return;
    }

    setLoading(true);
    setResult(null);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const response = await fetch('/api/screen', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            resume: reader.result,
            job: jobDesc
          })
        });

        const data = await response.json();
        setResult(data.result);
        setLastChecked(new Date().toLocaleString());
      } catch (error) {
        console.error('Upload error:', error);
        alert('Something went wrong. Try again.');
      } finally {
        setLoading(false);
      }
    };

    reader.readAsText(selectedFile);
  };

  return (
    <div className="upload-section" style={{ maxWidth: 700, margin: '2rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Upload Resume & Paste Job Description</h2>
      <form onSubmit={handleSubmit}>
        <div
          className={`file-upload ${dragOver ? 'drag-over' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            border: `2px dashed ${dragOver ? '#7c3aed' : '#a855f7'}`,
            padding: '2rem',
            textAlign: 'center',
            borderRadius: 8,
            backgroundColor: dragOver ? '#f3e8ff' : '#f9f9f9',
            marginBottom: '1rem'
          }}
        >
          <i className="fas fa-cloud-upload-alt" style={{ fontSize: 40, color: '#a855f7' }}></i>
          <p>Drag & drop resume here or</p>
          <label htmlFor="fileInput" style={{ cursor: 'pointer', color: '#7c3aed', fontWeight: 'bold' }}>
            Select File
          </label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} id="fileInput" style={{ display: 'none' }} />
        </div>

        {selectedFile && (
          <div style={{ marginBottom: '1rem', padding: '1rem', background: '#eef', borderRadius: 6 }}>
            <i className="fas fa-file-alt" style={{ marginRight: 8, color: '#a855f7' }}></i>
            {selectedFile.name}
          </div>
        )}

        <textarea
          placeholder="Paste job description here..."
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          rows={6}
          style={{ width: '100%', padding: '1rem', borderRadius: 6, border: '1px solid #ccc', marginBottom: '1rem' }}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            backgroundColor: '#a855f7',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '0.75rem 1.5rem',
            fontWeight: 'bold',
            fontSize: 16,
            cursor: 'pointer'
          }}
        >
          {loading ? <><i className="fas fa-spinner fa-spin"></i> Analyzing...</> : 'Analyze Resume'}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '2rem', backgroundColor: '#f9f9f9', padding: '1.5rem', borderRadius: 8 }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Result</h3>
          <pre style={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{result}</pre>
        </div>
      )}

      <div style={{ marginTop: '2rem', backgroundColor: '#a855f7', color: '#fff', padding: '1rem', borderRadius: 8 }}>
        <h4 style={{ marginBottom: '0.5rem' }}>Upload Status</h4>
        <p>Total Resumes Uploaded: <strong>{selectedFile ? 1 : 0}</strong></p>
        <p>Last Checked: <strong>{lastChecked || 'Not yet checked'}</strong></p>
      </div>
    </div>
  );
}
