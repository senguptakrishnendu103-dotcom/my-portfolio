import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, Users, Trophy, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import './About.css';

const About = () => {
  const { title, content, skills, learning, stats } = portfolioData.about;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  const statIcons = [GraduationCap, Users, Trophy, Sparkles];

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <motion.div 
          className="about-header text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <div className="section-badge">
            <Sparkles size={14} />
            <span>Background & Curiosity</span>
          </div>
          <h2 className="heading-lg">
            {title} <span className="text-gradient">.</span>
          </h2>
          <p className="section-subtitle">
            A snapshot of my academic journey, technical orientation, and continuous evolution.
          </p>
        </motion.div>

        {/* Quick Highlights / Stats Grid */}
        {stats && stats.length > 0 && (
          <motion.div 
            className="about-stats-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {stats.map((stat, idx) => {
              const IconComp = statIcons[idx % statIcons.length];
              return (
                <motion.div 
                  key={idx} 
                  className="about-stat-card glass-panel"
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  <div className="stat-icon-wrap">
                    <IconComp size={20} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-value text-gradient">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                    <span className="stat-detail">{stat.detail}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        <div className="about-grid">
          <motion.div 
            className="about-content glass-panel"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            <p>{content}</p>
            <div className="about-resume-action" style={{ marginTop: '1.75rem' }}>
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-secondary btn-sm"
                title="View Resume PDF"
              >
                <FileText size={15} />
                <span>View Full Resume (PDF)</span>
              </a>
            </div>
          </motion.div>

          {/* DO NOT MODIFY, REMOVE, REARRANGE, OR REDESIGN THE SKILLS SECTION - KEPT EXACTLY AS IT IS */}
          <div className="about-skills-wrapper">
            <motion.div 
              className="skills-container"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h3 variants={itemVariants} className="skills-title">Core Competencies</motion.h3>
              <div className="skills-tags">
                {skills.map((skill, index) => (
                  <motion.span 
                    key={index} 
                    className="skill-tag"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {learning && learning.length > 0 && (
              <motion.div 
                className="skills-container learning-container"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{ marginTop: '2.5rem' }}
              >
                <motion.h3 variants={itemVariants} className="skills-title" style={{ color: 'var(--text-secondary)' }}>Actively Learning</motion.h3>
                <div className="skills-tags">
                  {learning.map((skill, index) => (
                    <motion.span 
                      key={index} 
                      className="skill-tag learning-tag"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
