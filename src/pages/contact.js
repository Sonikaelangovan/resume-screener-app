import Head from 'next/head';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <div className={styles.contactPage}>
      <Head>
        <title>Contact Us | ResumeScreener.ai</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link rel="stylesheet" href="/style2.css" />
      </Head>

      <nav className="navbar">
        <div className="logo">
          <i className="fas fa-file-alt"></i> ResumeScreener.ai
        </div>
        <ul className="nav-links">
          <li><a href="/#how-it-works">How it Works</a></li>
          <li><a href="/#upload">Upload</a></li>
          <li><a href="/#results">Results</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </nav>

      <section className={styles.contactSection}>
        <h2>Get in Touch</h2>
        <p className={styles.contactContent}>
          Have questions about ResumeScreener.ai, need support, or interested in a partnership? We'd love to hear from you!
        </p>

        {/* ✅ REVISED CONTACT GRID STARTS HERE */}
        <div className={styles.contactGrid}>
          {[
            {
              icon: 'fas fa-envelope',
              title: 'Email Us',
              desc: 'Send us an email anytime!',
              contact: 'support@resumescreener.com',
              link: 'mailto:support@resumescreener.com',
            },
            {
              icon: 'fas fa-phone-alt',
              title: 'Call Us',
              desc: 'Speak to our team during business hours.',
              contact: '+91 12345 67890',
              subtext: '(Mon–Fri, 9 AM – 5 PM IST)',
            },
            {
              icon: 'fas fa-map-marker-alt',
              title: 'Visit Us',
              desc: 'Our office is located at:',
              contact: '123 AI Tech Park, Innovation City, IN 560001',
            },
            {
              icon: 'fas fa-question-circle',
              title: 'Support',
              desc: 'For technical issues or feature requests.',
              contact: 'help@resumescreener.com',
              link: 'mailto:help@resumescreener.com',
            },
          ].map((item, index) => (
            <div key={index} className={styles.contactCard}>
              <i className={`${item.icon} ${styles.cardIcon}`}></i>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              {item.link ? (
                <a href={item.link} className={styles.contactLink}>{item.contact}</a>
              ) : (
                <p className={styles.contactText}>{item.contact}</p>
              )}
              {item.subtext && <p className={styles.subText}>{item.subtext}</p>}
            </div>
          ))}
        </div>
        {/* ✅ REVISED CONTACT GRID ENDS HERE */}

        <div className={styles.contactFormContainer}>
          <h3>Send Us a Message</h3>
          <form action="#" method="POST">
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>Your Name</label>
              <input type="text" id="name" name="name" required placeholder="John Doe" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Your Email</label>
              <input type="email" id="email" name="email" required placeholder="john.doe@example.com" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.formLabel}>Subject</label>
              <input type="text" id="subject" name="subject" required placeholder="Question about pricing" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>Your Message</label>
              <textarea id="message" name="message" required placeholder="Type your message here..." className={styles.formTextarea}></textarea>
            </div>
            <button type="submit" className="btn-primary">
              <i className="fas fa-paper-plane"></i> Send Message
            </button>
          </form>
        </div>
      </section>

      <section className={styles.mapSection}>
        <h2>Find Us on the Map</h2>
        <div className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15545.926838848773!2d77.61660145!3d13.0601955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1676e1c8d629%3A0xc3f8e52e2f6b3b5!2sBangalore%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1701479860640!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="ResumeScreener.ai Location"
          />
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <i className="fas fa-file-alt"></i> ResumeScreener.ai
          </div>
          <div className="footer-links">
            <a href="/#how-it-works">Features</a>
            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>
          </div>
          <p className="footer-bottom">© 2025 ResumeScreener.ai | Built with ❤️ and AI</p>
        </div>
      </footer>
    </div>
  );
}
