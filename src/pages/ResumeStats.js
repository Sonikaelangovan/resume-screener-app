import React, { useState, useEffect } from 'react';

export default function ResumeStats() {
  const [uploadCount, setUploadCount] = useState(0);
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const incrementCount = () => {
    setUploadCount(uploadCount + 1);
  };

  return (
    <div>
      <h2>Resume Stats</h2>
      <p>Total Resumes Uploaded: {uploadCount}</p>
      <p>Last Checked: {timestamp}</p>
      <button onClick={incrementCount}>Simulate Upload</button>
    </div>
  );
}
