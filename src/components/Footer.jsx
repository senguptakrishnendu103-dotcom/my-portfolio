import React from 'react';
import { ArrowUp, Code2, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import './Footer.css';

const LinkedInIcon = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Footer = () => {
  const { name, email } = portfolioData.personal;
  const { github, linkedin } = portfolioData.links;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">
              {name.split(' ')[0]}<span className="text-gradient">.</span>
            </span>
            <p className="footer-tagline">
              Aspiring AI/ML & Remote Sensing Researcher · Data Science · Full-Stack Builder
            </p>
          </div>

          <div className="footer-links">
            <a href="#about" className="f-link">About</a>
            <a href="#research" className="f-link">Research</a>
            <a href="#projects" className="f-link">Projects</a>
            <a href="#achievements" className="f-link">Achievements</a>
            <a href="#experience" className="f-link">Journey</a>
            <a href="#contact" className="f-link">Contact</a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="f-link" style={{ color: 'var(--accent-cyan)' }}>Resume</a>
          </div>

          <div className="footer-socials">
            <a href={github} target="_blank" rel="noreferrer" className="f-social-btn" aria-label="GitHub">
              <Code2 size={18} />
            </a>
            <a href={linkedin} target="_blank" rel="noreferrer" className="f-social-btn" aria-label="LinkedIn">
              <LinkedInIcon size={18} />
            </a>
            <a href={`mailto:${email}`} className="f-social-btn" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} {name}. Built with passion, curiosity & React.
          </p>

          <button onClick={scrollToTop} className="back-to-top" aria-label="Scroll to top">
            <span>Back to top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
