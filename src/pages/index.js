// pages/index.js
import { useState, useRef } from 'react'; // Import useState and useRef
import Head from 'next/head';
// No longer importing ResumeUpload as we're integrating the core logic directly
// import ResumeUpload from '../components/ResumeUpload';

export default function Home() {
  // State for job description
  const [jobDescription, setJobDescription] = useState('');
  // State for uploaded files
  const [selectedFiles, setSelectedFiles] = useState([]);
  // State for loading and error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Refs for DOM elements instead of getElementById
  const fileInputRef = useRef(null);
  const fileUploadAreaRef = useRef(null);
  const formRef = useRef(null); // Ref for the form

  // Handle file selection via button click
  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection via input change
  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  // Handle drag over effect
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent default browser behavior
    if (fileUploadAreaRef.current) {
      fileUploadAreaRef.current.style.backgroundColor = '#f0e6ff';
    }
  };

  // Handle drag leave effect
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent default browser behavior
    if (fileUploadAreaRef.current) {
      fileUploadAreaRef.current.style.backgroundColor = '';
    }
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent default browser behavior
    if (fileUploadAreaRef.current) {
      fileUploadAreaRef.current.style.backgroundColor = '';
    }
    setSelectedFiles(Array.from(e.dataTransfer.files));
  };

  // Function to parse resume (assumes a new /api/parse-resume endpoint)
  const parseResumeToText = async (file) => {
    setError(null); // Clear previous errors
    try {
      const formData = new FormData();
      formData.append('resumeFile', file); // Use 'resumeFile' as the field name

      const response = await fetch('/api/parse-resume', { // New API endpoint for parsing
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to parse resume file.');
      }

      const data = await response.json();
      return data.resumeText; // This should be the plain text content of the resume
    } catch (parseErr) {
      console.error('Error parsing resume:', parseErr);
      setError(`Failed to process resume "${file.name}": ${parseErr.message}`);
      throw parseErr; // Re-throw to stop submission if parsing fails
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (selectedFiles.length === 0) {
      setError('Please upload at least one resume.');
      return;
    }
    if (!jobDescription.trim()) {
      setError('Please provide a job description.');
      return;
    }

    setLoading(true);

    try {
      // 1. Parse the first resume (assuming only one for now based on your previous code)
      const resumeText = await parseResumeToText(selectedFiles[0]);

      // 2. Send parsed resume text and job description to the /api/screen endpoint
      const response = await fetch('/api/screen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText: resumeText,
          jobDescription: jobDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle API errors returned by the backend
        setError(data.message || data.error || 'An unexpected error occurred during screening.');
        return; // Stop execution
      }

      // Assuming the backend returns { result: { summary: "...", score: 85 } }
      setResult(data.result);
      // Scroll to results if successful
      document.getElementById('results').scrollIntoView({ behavior: 'smooth' });

    } catch (err) {
      // This catch block handles network errors, parseResumeToText errors, or other unexpected errors
      console.error('Submission error:', err);
      setError('An error occurred during the screening process. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Resume Screener AI</title>
        <meta name="description" content="Instantly analyze and rank resumes using AI." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      <nav className="navbar">
        <div className="logo">
          <i className="fas fa-file-alt"></i>
          ResumeScreener.ai
        </div>
        <ul className="nav-links">
          <li><a href="#how-it-works">How it Works</a></li>
          <li><a href="#upload">Upload</a></li>
          <li><a href="#results">Results</a></li>
        </ul>
      </nav>

      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <center>
            <h1>Boost Your Hiring Accuracy</h1>
            <p>Instantly analyze and rank resumes using AI. Find the best candidates in seconds.</p>
            <a href="#upload" className="btn-primary pulse">
              <i className="fas fa-rocket"></i> Try It Now
            </a>
          </center>
        </div>
      </section>

      <section id="how-it-works" className="info-section">
        <h2>How It Works</h2>
        <div className="info-cards">
          <div className="card"><i className="fas fa-upload"></i><span>Upload Resumes</span></div>
          <div className="card"><i className="fas fa-file-alt"></i><span>Paste Job Description</span></div>
          <div className="card"><i className="fas fa-brain"></i><span>AI Analyzes Content</span></div>
          <div className="card"><i className="fas fa-chart-line"></i><span>Get Ranked Candidates</span></div>
        </div>
      </section>

      <section className="upload-section" id="upload">
        <center><h2>Upload Resumes & Job Description</h2></center>
        <form onSubmit={handleFormSubmit} ref={formRef} className="form-container">
          <div
            className="file-upload-area"
            ref={fileUploadAreaRef}
            onClick={handleFileUploadClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="resumes"
              name="resumes"
              accept=".pdf,.doc,.docx" // Accept common resume formats
              multiple // Allow multiple files, though current logic only processes one
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }} // Hide the actual input
            />
            <p>Drag & Drop your resumes here or click to select files</p>
            <div className="file-list">
              {selectedFiles.length === 0 ? (
                <p>No files selected</p>
              ) : (
                selectedFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <i className="fas fa-file-alt"></i>
                    <span>{file.name}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="job-description-container">
            <label htmlFor="job_description">Job Description:</label>
            <textarea
              id="job_description"
              rows="10"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary submit-btn" disabled={loading}>
            {loading ? <><i className="fas fa-spinner fa-spin"></i> Analyzing...</> : 'Analyze Resumes'}
          </button>
        </form>
      </section>

      <section id="results" className="results-section container">
        <center><h2>Analysis Results</h2></center>
        {loading && <p className="loading-message">Analyzing... Please wait.</p>}
        {error && <p className="error-message">{error}</p>}
        {result ? (
          <div className="result-display">
            <h3>Summary:</h3>
            <p>{result.summary}</p>
            <h3>Compatibility Score:</h3>
            <p className="score">{result.score}/100</p>
          </div>
        ) : (
          <p className="no-result-message">Results will appear here after analysis.</p>
        )}
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <i className="fas fa-file-alt"></i>
            ResumeScreener.ai
          </div>
          <div className="footer-links">
            <a href="#how-it-works">Features</a>
            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>
          </div>
          <p className="footer-bottom">© 2025 ResumeScreener.ai | Built with ❤️ and AI</p>
        </div>
      </footer>
    </>
  );
}
