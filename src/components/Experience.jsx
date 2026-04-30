import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import './Experience.css';

const Experience = () => {
  const { experience } = portfolioData;

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section className="section experience-section" id="experience">
      <div className="container">
        <motion.div 
          className="experience-header text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="heading-lg">
            Journey & Experience <span className="text-gradient">.</span>
          </h2>
        </motion.div>

        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          {experience.map((exp, index) => (
            <motion.div 
              key={exp.id}
              className="timeline-item"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-panel">
                <div className="timeline-header">
                  <h3 className="timeline-title">{exp.title}</h3>
                  <span className="timeline-period">{exp.period}</span>
                </div>
                <h4 className="timeline-company">{exp.company}</h4>
                <p className="timeline-desc">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
