import Head from 'next/head';
import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.aboutPage}>
      <Head>
        <title>About Us | ResumeScreener.ai</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link rel="stylesheet" href="/style1.css" />
      </Head>

      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <i className="fas fa-file-alt"></i>
          ResumeScreener.ai
        </div>
        <ul className={styles['nav-links']}>
          <li><a href="/#how-it-works">How it Works</a></li>
          <li><a href="/#upload">Upload</a></li>
          <li><a href="/#results">Results</a></li>
          <li><a href="/about">About Us</a></li>
        </ul>
      </nav>

      <section className={styles['about-section']}>
        <h2>About ResumeScreener.ai</h2>
        <div className={styles['about-content']}>
          <p>
            At ResumeScreener.ai, we believe that finding the right talent should be efficient, unbiased, and effective. We leverage cutting-edge Artificial Intelligence to transform the tedious and time-consuming process of resume screening into a swift, accurate, and insightful experience for recruiters and hiring managers.
          </p>
          <p>
            Our platform was born out of a desire to solve common hiring challenges: the overwhelming volume of applications, the struggle to identify truly relevant candidates, and the potential for unconscious bias in manual reviews. By automating the initial screening, we empower your team to focus on what matters most – engaging with top-tier candidates.
          </p>
          <p className={styles['about-highlight']}>
            We are committed to helping organizations build stronger teams, faster.
          </p>
        </div>
      </section>

      <section className={styles['mission-section']} style={{ background: '#fff' }}>
        <h2>Our Mission</h2>
        <div className={styles['mission-content']}>
          <p>
            Our mission is to revolutionize recruitment by providing an intelligent, user-friendly, and highly accurate AI-powered resume screening solution. We aim to:
          </p>
          <ul>
            <li>Streamline the Hiring Process: Significantly reduce the time and effort spent on initial resume review.</li>
            <li>Enhance Candidate Quality: Help companies identify the most suitable candidates based on objective criteria and job requirements.</li>
            <li>Promote Fair Hiring: Minimize human bias by focusing on qualifications and experience.</li>
            <li>Empower Recruiters: Free up valuable time for recruiters to engage in more strategic talent acquisition activities.</li>
          </ul>
        </div>
      </section>

      <section className={styles['values-section']}>
        <h2>Our Core Values</h2>
        <div className={styles['values-grid']}>
          <div className={styles['value-item']}>
            <i className="fas fa-brain"></i>
            <h3>Innovation</h3>
            <p>We are constantly exploring new AI technologies and methodologies to ensure our platform remains at the forefront of recruitment innovation.</p>
          </div>
          <div className={styles['value-item']}>
            <i className="fas fa-handshake"></i>
            <h3>Integrity</h3>
            <p>We operate with transparency, honesty, and a commitment to ethical AI practices in all our services.</p>
          </div>
          <div className={styles['value-item']}>
            <i className="fas fa-users"></i>
            <h3>Customer Focus</h3>
            <p>Our users are at the heart of everything we do. We strive to provide exceptional service and a platform that truly meets their needs.</p>
          </div>
          <div className={styles['value-item']}>
            <i className="fas fa-shield-alt"></i>
            <h3>Accuracy & Reliability</h3>
            <p>We are dedicated to delivering highly accurate results and a reliable platform that our users can trust.</p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles['footer-content']}>
          <div className={styles['footer-logo']}>
            <i className="fas fa-file-alt"></i>
            ResumeScreener.ai
          </div>
          <div className={styles['footer-links']}>
            <a href="/#how-it-works">Features</a>
            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>
          </div>
          <p className={styles['footer-bottom']}>© 2025 ResumeScreener.ai | Built with ❤️ and AI</p>
        </div>
      </footer>
    </div>
  );
}
