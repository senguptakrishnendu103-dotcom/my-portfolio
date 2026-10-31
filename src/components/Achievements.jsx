import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Users, Globe2, Sparkles, Calendar, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import './Achievements.css';

const Achievements = () => {
  const { achievements } = portfolioData;

  if (!achievements || achievements.length === 0) return null;

  const categoryIcons = {
    'Hackathon & Research': Trophy,
    'Academics': Award,
    'Leadership': Users,
    'Innovation': Globe2,
  };

  return (
    <section className="section achievements-section" id="achievements">
      <div className="bg-glow bg-glow-3"></div>
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="achievements-header text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-badge">
            <Trophy size={14} />
            <span>Milestones & Recognition</span>
          </div>
          <h2 className="heading-lg">
            Honors & Achievements <span className="text-gradient">.</span>
          </h2>
          <p className="section-subtitle">
            Notable milestones across academic dedication, technical innovation, and collaborative engineering.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="achievements-grid">
          {achievements.map((item, index) => {
            const IconComponent = categoryIcons[item.category] || Award;

            return (
              <motion.div 
                key={item.id}
                className="achievement-card glass-panel"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <div className="achievement-top">
                  <div className="achievement-icon-wrap">
                    <IconComponent size={22} />
                  </div>
                  <div className="achievement-meta">
                    <span className="achievement-badge">{item.badge}</span>
                    <span className="achievement-year">
                      <Calendar size={12} /> {item.year}
                    </span>
                  </div>
                </div>

                <div className="achievement-body">
                  <span className="achievement-org">{item.organization}</span>
                  <h3 className="achievement-title">{item.title}</h3>
                  <p className="achievement-desc">{item.description}</p>
                  
                  {item.impact && (
                    <div className="achievement-impact">
                      <CheckCircle2 size={15} className="impact-check" />
                      <span>{item.impact}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
