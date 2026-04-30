import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import './Hero.css';

const Hero = () => {
  const { name, title, description, photo } = portfolioData.personal;
  const { linkedin } = portfolioData.links;

  return (
    <section className="section hero-section" id="home">
      <div className="bg-glow bg-glow-1"></div>
      
      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Hello, I'm
          </motion.p>
          <motion.h1 
            className="heading-xl hero-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {name}
          </motion.h1>
          <motion.h2 
            className="heading-lg text-gradient hero-role"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {description}
          </motion.p>

          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <a href="#projects" className="btn btn-primary">
              View My Work <ArrowRight size={18} />
            </a>
            <a href={linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)'}}>
              My LinkedIn
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="hero-image-container glass-panel">
            <img src={photo} alt={name} className="hero-image" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
