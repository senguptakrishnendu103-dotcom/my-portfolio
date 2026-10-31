import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FlaskConical, ExternalLink, FileText, Sparkles, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import './Hero.css';

const Hero = () => {
  const { name, title, description, photo, status } = portfolioData.personal;
  const { linkedin, github, resume } = portfolioData.links;

  return (
    <section className="section hero-section" id="home">
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>
      <div className="bg-glow bg-glow-3"></div>
      
      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Status Badge */}
          <motion.div 
            className="hero-status-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <span className="pulse-dot"></span>
            <span>{status || "Open to Research Internships & Collaborations"}</span>
          </motion.div>

          {/* Salutation & Name */}
          <motion.h1 
            className="heading-xl hero-title"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <span className="hero-greeting">Hi, I'm</span>{' '}
            <span className="hero-name-gradient">{name}</span>
          </motion.h1>

          {/* Role Tagline */}
          <motion.div 
            className="hero-role-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <h2 className="hero-role">
              {title}
            </h2>
          </motion.div>

          {/* Bio Description */}
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            {description}
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <a href="#research" className="btn btn-primary hero-btn">
              <FlaskConical size={18} />
              <span>Explore Research</span>
            </a>

            <a href="#projects" className="btn btn-secondary hero-btn">
              <span>View Projects</span>
              <ArrowRight size={17} />
            </a>

            {resume && (
              <a 
                href={resume} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-secondary hero-btn"
                aria-label="View Resume"
                title="View Resume PDF"
              >
                <FileText size={17} />
                <span>Resume (PDF)</span>
              </a>
            )}

            <a 
              href={linkedin} 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-ghost hero-btn-icon"
              aria-label="LinkedIn Profile"
              title="Connect on LinkedIn"
            >
              <span>LinkedIn</span>
              <ExternalLink size={15} />
            </a>
          </motion.div>

          {/* Quick Terminal Meta Pill */}
          <motion.div 
            className="hero-terminal-pill glass-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Terminal size={14} className="terminal-icon" />
            <span className="terminal-text">
              focus: <span className="highlight-text">Artificial Intelligence · Deep Learning · Data Science</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Hero Visual Avatar & Floating Accents */}
        <motion.div 
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-avatar-card">
            {/* Ambient Multi-Ring Glow */}
            <div className="avatar-ambient-glow"></div>
            
            <div className="hero-image-container glass-panel">
              <img 
                src={photo} 
                alt={name} 
                className="hero-image" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";
                }}
              />
            </div>



            {/* Floating Badge 2: AI / ML Inquisitive */}
            <motion.div 
              className="floating-badge badge-bottom-left glass-panel"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="badge-icon-wrap icon-indigo">
                <FlaskConical size={16} />
              </div>
              <div className="badge-text-wrap">
                <span className="badge-title">Aspiring Researcher</span>
                <span className="badge-subtitle">Data Science & AI/ML</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
