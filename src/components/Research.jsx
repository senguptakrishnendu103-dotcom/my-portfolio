import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FlaskConical, 
  Satellite, 
  Sparkles, 
  BookOpen, 
  Compass, 
  Layers, 
  ArrowUpRight, 
  BrainCircuit, 
  ShieldCheck, 
  BarChart3, 
  Mail, 
  HelpCircle 
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import './Research.css';

const Research = () => {
  const { research } = portfolioData;
  const [activePillar, setActivePillar] = useState(null);

  if (!research) return null;

  const { badge, title, tagline, philosophy, pillars, readingList } = research;

  const pillarIcons = {
    'remote-sensing': Satellite,
    'applied-cv-agro': BrainCircuit,
    'verifiable-systems': ShieldCheck,
    'data-analytics': BarChart3,
  };

  return (
    <section className="section research-section" id="research">
      <div className="bg-glow bg-glow-2"></div>
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="research-header text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-badge research-badge">
            <FlaskConical size={14} />
            <span>{badge || "Research & Exploration"}</span>
          </div>
          <h2 className="heading-lg">
            {title} <span className="text-gradient">.</span>
          </h2>
          <p className="section-subtitle">
            {tagline}
          </p>
        </motion.div>

        {/* Aspiring Researcher Philosophy Card */}
        <motion.div 
          className="philosophy-card glass-panel"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="philosophy-header">
            <div className="philosophy-icon-wrap">
              <Compass size={22} />
            </div>
            <div>
              <span className="philosophy-role-tag">Aspiring Researcher Perspective</span>
              <h3 className="philosophy-title">Curiosity, First-Principles Learning & Real-World Impact</h3>
            </div>
          </div>
          <p className="philosophy-body">
            {philosophy}
          </p>
          <div className="philosophy-badges">
            <span className="phi-pill">🌱 Eager to Learn</span>
            <span className="phi-pill">🔬 Hypothesis-Driven</span>
            <span className="phi-pill">🤝 Seeking Research Mentorship</span>
            <span className="phi-pill">💡 Passionate About Societal Impact</span>
          </div>
        </motion.div>

        {/* Research Exploration Pillars */}
        <div className="pillars-intro">
          <h3 className="pillars-heading">
            <Layers size={18} className="heading-icon" />
            <span>Active Exploratory Tracks</span>
          </h3>
          <p className="pillars-subtext">
            Areas where I am actively reading literature, formulating inquiries, and testing prototypes.
          </p>
        </div>

        <div className="pillars-grid">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillarIcons[pillar.id] || Sparkles;
            const isSelected = activePillar === pillar.id;

            return (
              <motion.div 
                key={pillar.id}
                className={`pillar-card glass-panel ${isSelected ? 'pillar-active' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                onClick={() => setActivePillar(isSelected ? null : pillar.id)}
              >
                <div className="pillar-top">
                  <div className="pillar-icon-box">
                    <IconComponent size={22} />
                  </div>
                  <span className="pillar-status">{pillar.status}</span>
                </div>

                <span className="pillar-category">{pillar.category}</span>
                <h4 className="pillar-title">{pillar.title}</h4>
                <p className="pillar-description">{pillar.description}</p>

                {/* Core Research Question Box */}
                <div className="pillar-inquiry-box">
                  <div className="inquiry-header">
                    <HelpCircle size={14} />
                    <span>Research Inquiry</span>
                  </div>
                  <p className="inquiry-text">"{pillar.inquiry}"</p>
                </div>

                {/* Focus Area Tags */}
                <div className="pillar-tags">
                  {pillar.focusAreas.map((area, i) => (
                    <span key={i} className="focus-tag">{area}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Current Reading & Literature Explorations */}
        {readingList && readingList.length > 0 && (
          <motion.div 
            className="reading-section glass-panel"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="reading-header">
              <div className="reading-icon-wrap">
                <BookOpen size={20} />
              </div>
              <div>
                <h4 className="reading-title">Literature & Emerging Topics on My Radar</h4>
                <p className="reading-subtext">Topics, ArXiv papers, and architectures I am currently studying and synthesizing.</p>
              </div>
            </div>

            <div className="reading-list">
              {readingList.map((item, idx) => (
                <div key={idx} className="reading-item">
                  <span className="reading-number">0{idx + 1}</span>
                  <span className="reading-content">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Collaboration Invitation Banner */}
        <motion.div 
          className="collab-card glass-panel"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="collab-content">
            <h4 className="collab-title">Open for Research Internships & Academic Collaborations</h4>
            <p className="collab-text">
              If you are a professor, researcher, or fellow student working on multimodal AI, deep learning, or applied machine learning, I would be thrilled to connect, learn, and contribute to your lab's mission.
            </p>
          </div>
          <a href="#contact" className="btn btn-primary collab-btn">
            <Mail size={16} />
            <span>Discuss Research</span>
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Research;
