// src/components/ResumeUpload.js
import React, { useState } from 'react';

export default function ResumeUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

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

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      alert(`Uploading: ${selectedFile.name}`);
      // Upload logic here: send to API or backend
    }
  };

  return (
    <div className="upload-section">
      <h2>Upload Resume</h2>
      <form onSubmit={handleSubmit}>
        <div
          className={`file-upload ${dragOver ? 'drag-over' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <i className="fas fa-cloud-upload-alt"></i>
          <p>Drag & drop your resume here, or click to select</p>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="fileInput"
          />
          <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
            <strong>Select File</strong>
          </label>
        </div>

        {selectedFile && (
          <div className="file-list">
            <div className="file-item">
              <i className="fas fa-file-alt"></i>
              <span>{selectedFile.name}</span>
            </div>
          </div>
        )}

        <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
          Submit
        </button>
      </form>
    </div>
  );
}

