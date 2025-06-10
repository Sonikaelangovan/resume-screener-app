import React, { useState, useEffect } from 'react';

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('Waiting for upload...');

  const handleUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setUploadStatus('Uploading...');
    }
  };

  useEffect(() => {
    if (file) {
      // Simulate file processing
      const timer = setTimeout(() => {
        setUploadStatus(`File "${file.name}" uploaded and analyzed.`);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [file]);

  return (
    <div>
      <h2>Upload Resume</h2>
      <input type="file" onChange={handleUpload} />
      <p>Status: {uploadStatus}</p>
    </div>
  );
}
