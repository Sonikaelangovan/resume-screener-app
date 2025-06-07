import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Resume Screener AI | Instant Resume Scanner</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
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
          <div className="card">
            <i className="fas fa-upload"></i>
            <span>Upload Resumes</span>
          </div>
          <div className="card">
            <i className="fas fa-file-alt"></i>
            <span>Paste Job Description</span>
          </div>
          <div className="card">
            <i className="fas fa-brain"></i>
            <span>AI Analyzes Content</span>
          </div>
          <div className="card">
            <i className="fas fa-chart-line"></i>
            <span>Get Ranked Candidates</span>
          </div>
        </div>
      </section>

      <section id="upload" className="upload-section">
        <div className="container fade-in">
          <h2>Upload Resumes & Job Description</h2>
          <form id="uploadForm">
            <div className="form-group">
              <label htmlFor="job_description">Job Description</label>
              <textarea
                id="job_description"
                name="job_description"
                rows="6"
                required
                placeholder="Paste job description here..."
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="resumes">Upload Resumes (.pdf/.docx)</label>
              <div className="file-upload" id="fileUpload">
                <i className="fas fa-cloud-upload-alt"></i>
                <p>Drag and drop files here or click to browse</p>
                <p className="small">Supported formats: PDF, DOCX</p>
                <input
                  type="file"
                  id="resumes"
                  name="resumes"
                  multiple
                  accept=".pdf,.docx"
                  required
                  style={{ display: 'none' }}
                />
              </div>
              <div className="file-list" id="fileList"></div>
            </div>
            <button type="submit" className="btn-primary">
              <i className="fas fa-search"></i> Analyze
            </button>
          </form>
        </div>
      </section>

      <section id="results" className="results-section container">
        {/* Sample results - JS will replace these */}
        <h2>Top Matches</h2>

        <div className="result-card">
          <div className="result-header">
            <div className="result-title">
              <i className="fas fa-user-tie"></i>
              <h3>John Smith.pdf</h3>
            </div>
            <div className="match-score">
              <i className="fas fa-star"></i>
              92%
            </div>
          </div>
          <div className="result-content">
            <h4>Relevant Experience</h4>
            <p>
              Software Engineer with 5+ years of experience in full-stack development. Proficient in JavaScript, React,
              Node.js, and cloud technologies. Led a team of 5 developers to deliver a customer-facing application that
              increased user engagement by 30%.
            </p>
            <div className="result-metrics">
              <div className="metric">
                <i className="fas fa-briefcase"></i>
                <span>5+ Years Experience</span>
              </div>
              <div className="metric">
                <i className="fas fa-check-circle"></i>
                <span>3 Skills Matched</span>
              </div>
              <div className="metric">
                <i className="fas fa-graduation-cap"></i>
                <span>Master&apos;s Degree</span>
              </div>
            </div>
          </div>
        </div>

        <div className="result-card">
          <div className="result-header">
            <div className="result-title">
              <i className="fas fa-user-tie"></i>
              <h3>Sarah Johnson.pdf</h3>
            </div>
            <div className="match-score">
              <i className="fas fa-star"></i>
              87%
            </div>
          </div>
          <div className="result-content">
            <h4>Relevant Experience</h4>
            <p>
              UX/UI Designer with expertise in creating user-centered designs for web and mobile applications.
              Experience with Figma, Sketch, and Adobe Creative Suite. Collaborated with product managers and developers
              to deliver intuitive and accessible interfaces.
            </p>
            <div className="result-metrics">
              <div className="metric">
                <i className="fas fa-briefcase"></i>
                <span>3+ Years Experience</span>
              </div>
              <div className="metric">
                <i className="fas fa-check-circle"></i>
                <span>4 Skills Matched</span>
              </div>
              <div className="metric">
                <i className="fas fa-graduation-cap"></i>
                <span>Bachelor&apos;s Degree</span>
              </div>
            </div>
          </div>
        </div>
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
