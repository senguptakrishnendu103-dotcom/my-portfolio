import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Code2, Send, Copy, Check, MessageSquare, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import './Contact.css';

const LinkedInIcon = ({ size = 20, className = "" }) => (
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

const Contact = () => {
  const { email, location } = portfolioData.personal;
  const { github, linkedin } = portfolioData.links;
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="bg-glow bg-glow-2"></div>
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="contact-header text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-badge">
            <MessageSquare size={14} />
            <span>Connect & Collaborate</span>
          </div>
          <h2 className="heading-lg">
            Get In Touch <span className="text-gradient">.</span>
          </h2>
          <p className="contact-subtitle">
            Whether you want to discuss research, brainstorm ideas, explore internship opportunities, or just say hello!
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Contact Left Column */}
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Email Glass Card */}
            <div className="info-card glass-panel">
              <div className="info-icon-wrap">
                <Mail size={24} />
              </div>
              <div className="info-content">
                <span className="info-label">Direct Email</span>
                <p className="info-value">{email}</p>
                <div className="info-actions">
                  <a href={`mailto:${email}`} className="btn btn-primary btn-sm">
                    Open Mail App
                  </a>
                  <button 
                    onClick={handleCopyEmail} 
                    className="btn btn-secondary btn-sm"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check size={14} className="copied-check" /> : <Copy size={14} />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Location Card */}
            {location && (
              <div className="location-card glass-panel">
                <MapPin size={18} className="loc-icon" />
                <span>{location}</span>
              </div>
            )}

            {/* Social Connection Cards */}
            <div className="social-links-grid">
              <a 
                href={github} 
                target="_blank" 
                rel="noreferrer" 
                className="social-card glass-panel" 
                aria-label="GitHub Profile"
              >
                <Code2 size={20} className="social-icon" />
                <div className="social-meta">
                  <span className="social-name">GitHub</span>
                  <span className="social-handle">@senguptakrishnendu103</span>
                </div>
              </a>

              <a 
                href={linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="social-card glass-panel" 
                aria-label="LinkedIn Profile"
              >
                <LinkedInIcon size={20} className="social-icon" />
                <div className="social-meta">
                  <span className="social-name">LinkedIn</span>
                  <span className="social-handle">Krishnendu Sengupta</span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Right Column: Form */}
          <motion.div 
            className="contact-form-container glass-panel"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="form-heading">Send a Direct Message</h3>
            <p className="form-subtext">Fill in your details and I'll get back to you promptly.</p>

            {submitted ? (
              <div className="submission-success">
                <Check size={32} className="success-icon" />
                <h4>Message Received!</h4>
                <p>Thank you for reaching out. I look forward to connecting with you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    className="form-input"
                    placeholder="e.g. Dr. Alex Mercer / John Doe"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    className="form-input"
                    placeholder="e.g. alex@university.edu"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    required 
                    className="form-input form-textarea"
                    placeholder="Tell me about your research project, role, or ideas you'd like to collaborate on..."
                    rows="5"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={16} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
