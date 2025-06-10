import Head from 'next/head';
import { useEffect } from 'react';
import ResumeUpload from '../components/ResumeUpload';
import ResumeStats from '../components/ResumeStats';

export default function Home() {
  useEffect(() => {
    const fileUpload = document.getElementById('fileUpload');
    const fileInput = document.getElementById('resumes');
    const fileList = document.getElementById('fileList');
    const form = document.getElementById('uploadForm');
    const resultSection = document.getElementById('results');

    if (!fileUpload || !fileInput || !fileList || !form || !resultSection) return;

    const updateFileList = () => {
      fileList.innerHTML = '';
      const files = fileInput.files;
      for (let i = 0; i < files.length; i++) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `<i class="fas fa-file-alt"></i><span>${files[i].name}</span>`;
        fileList.appendChild(fileItem);
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      fileUpload.style.backgroundColor = '';
      fileInput.files = e.dataTransfer.files;
      updateFileList();
    };

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      const resumes = fileInput.files;
      const jd = document.getElementById('job_description').value;

      for (let i = 0; i < resumes.length; i++) {
        formData.append('resumes', resumes[i]);
      }
      formData.append('job_description', jd);

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
      submitBtn.disabled = true;

      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const results = [
          {
            filename: 'John Smith.pdf',
            match_score: 92,
            text_snippet: 'Software Engineer with 5+ years...',
            experience: '5+ Years Experience',
            skills: '3 Skills Matched',
            education: "Master's Degree"
          },
          {
            filename: 'Sarah Johnson.pdf',
            match_score: 87,
            text_snippet: 'UX/UI Designer with expertise...',
            experience: '3+ Years Experience',
            skills: '4 Skills Matched',
            education: "Bachelor's Degree"
          }
        ];
        resultSection.innerHTML = '<h2>Top Matches</h2>';
        results.forEach(res => {
          const card = document.createElement('div');
          card.className = 'result-card';
          card.innerHTML = `
            <div class="result-header">
              <div class="result-title"><i class="fas fa-user-tie"></i><h3>${res.filename}</h3></div>
              <div class="match-score"><i class="fas fa-star"></i>${res.match_score}%</div>
            </div>
            <div class="result-content">
              <h4>Relevant Experience</h4>
              <p>${res.text_snippet}</p>
              <div class="result-metrics">
                <div class="metric"><i class="fas fa-briefcase"></i><span>${res.experience}</span></div>
                <div class="metric"><i class="fas fa-check-circle"></i><span>${res.skills}</span></div>
                <div class="metric"><i class="fas fa-graduation-cap"></i><span>${res.education}</span></div>
              </div>
            </div>
          `;
          resultSection.appendChild(card);
        });
        resultSection.scrollIntoView({ behavior: 'smooth' });
      } catch (err) {
        console.error(err);
        alert('Something went wrong');
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    };

    fileUpload.addEventListener('click', () => fileInput.click());
    fileUpload.addEventListener('dragover', e => {
      e.preventDefault();
      fileUpload.style.backgroundColor = '#f0e6ff';
    });
    fileUpload.addEventListener('dragleave', () => {
      fileUpload.style.backgroundColor = '';
    });
    fileUpload.addEventListener('drop', handleDrop);
    fileInput.addEventListener('change', updateFileList);
    form.addEventListener('submit', handleFormSubmit);

    return () => {
      fileUpload.removeEventListener('click', () => fileInput.click());
      fileUpload.removeEventListener('dragover', () => {});
      fileUpload.removeEventListener('dragleave', () => {});
      fileUpload.removeEventListener('drop', handleDrop);
      fileInput.removeEventListener('change', updateFileList);
      form.removeEventListener('submit', handleFormSubmit);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Resume Screener AI</title>
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
              <textarea id="job_description" rows="6" required placeholder="Paste job description here..."></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="resumes">Upload Resumes (.pdf/.docx)</label>
              <div
                className="file-upload"
                id="fileUpload"
                onClick={() => document.getElementById('resumes').click()}
              >
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
      <ResumeUpload />
      <ResumeStats />

      <section id="results" className="results-section container">
        {/* JS will populate results here */}
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

