import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Code2, User, Send } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import './Contact.css';

const Contact = () => {
  const { email } = portfolioData.personal;
  const { github, linkedin } = portfolioData.links;
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      alert("Thanks for reaching out! I'll get back to you soon.");
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <motion.div 
          className="contact-header text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="heading-lg">
            Get In Touch <span className="text-gradient">.</span>
          </h2>
          <p className="contact-subtitle">Let's build something amazing together.</p>
        </motion.div>

        <div className="contact-grid">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="info-card glass-panel">
              <Mail className="info-icon" size={32} />
              <div className="info-content">
                <h3>Email</h3>
                <p>{email}</p>
                <a href={`mailto:${email}`} className="info-link">Say Hello</a>
              </div>
            </div>

            <div className="social-links" style={{ flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <a href={github} target="_blank" rel="noreferrer" className="social-link glass-panel" aria-label="GitHub/Code" style={{ width: '100%', borderRadius: '12px', padding: '1rem' }}>
                <Code2 size={24} /> <span style={{marginLeft: '10px', fontSize: '1.1rem', fontWeight: '500'}}>GitHub Profile</span>
              </a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="social-link glass-panel" aria-label="LinkedIn/User" style={{ width: '100%', borderRadius: '12px', padding: '1rem' }}>
                <User size={24} /> <span style={{marginLeft: '10px', fontSize: '1.1rem', fontWeight: '500'}}>LinkedIn Profile</span>
              </a>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-container glass-panel"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  className="form-input"
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  className="form-input"
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                  className="form-input form-textarea"
                  placeholder="How can I help you?"
                  rows="5"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
