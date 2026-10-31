import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import './Experience.css';

const Experience = () => {
  const { experience } = portfolioData;

  return (
    <section className="section experience-section" id="experience">
      <div className="container">
        <motion.div 
          className="experience-header text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-badge">
            <Briefcase size={14} />
            <span>Academic & Builder Path</span>
          </div>
          <h2 className="heading-lg">
            Journey & Experience <span className="text-gradient">.</span>
          </h2>
          <p className="section-subtitle">
            Timeline of my academic foundations, hands-on development, and active self-directed initiatives.
          </p>
        </motion.div>

        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          {experience.map((exp, index) => (
            <motion.div 
              key={exp.id}
              className="timeline-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
            >
              <div className="timeline-dot">
                <div className="timeline-dot-inner"></div>
              </div>
              <div className="timeline-content glass-panel">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-title">{exp.title}</h3>
                    <h4 className="timeline-company">{exp.company}</h4>
                  </div>
                  <span className="timeline-period">
                    <Calendar size={13} /> {exp.period}
                  </span>
                </div>
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
