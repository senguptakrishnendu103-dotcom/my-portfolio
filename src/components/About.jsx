import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import './About.css';

const About = () => {
  const { title, content, skills, learning } = portfolioData.about;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <motion.div 
          className="about-header text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          <h2 className="heading-lg">
            {title} <span className="text-gradient">.</span>
          </h2>
        </motion.div>

        <div className="about-grid">
          <motion.div 
            className="about-content glass-panel"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={itemVariants}
          >
            <p>{content}</p>
          </motion.div>

          <div className="about-skills-wrapper">
            <motion.div 
              className="skills-container"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
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
                viewport={{ once: true, amount: 0.2 }}
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
