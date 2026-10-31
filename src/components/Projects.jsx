import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code2, Loader, FolderGit2, Sparkles, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { portfolioData } from '../data/portfolioData';
import './Projects.css';

const Projects = () => {
  const { projects: firestoreProjects, loading, error } = useProjects();
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedCards, setExpandedCards] = useState({});

  // Helper to categorize projects (especially dynamically fetched from Firestore)
  const getProjectCategory = (p) => {
    if (p.category) return p.category;
    const text = ((p.title || '') + ' ' + (p.technologies || []).join(' ') + ' ' + (p.description || '')).toLowerCase();
    if (text.includes('blockchain') || text.includes('voting') || text.includes('solidity') || text.includes('web3') || text.includes('ethereum')) {
      return 'Blockchain & Web3';
    }
    if (text.includes('ai') || text.includes('career') || text.includes('remote sensing') || text.includes('crop') || text.includes('deep learning') || text.includes('neural')) {
      return 'AI & Research';
    }
    return 'Full Stack';
  };

  // Combine or fallback
  const rawProjects = (firestoreProjects && firestoreProjects.length > 0)
    ? firestoreProjects
    : (portfolioData.defaultProjects || []);

  const categorizedProjects = rawProjects.map(p => ({
    ...p,
    detectedCategory: getProjectCategory(p)
  }));

  const categories = ['All', 'AI & Research', 'Blockchain & Web3', 'Full Stack'];

  const filteredProjects = activeCategory === 'All'
    ? categorizedProjects
    : categorizedProjects.filter(p => p.detectedCategory === activeCategory);

  const toggleExpand = (id) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="section projects-section" id="projects">
      <div className="bg-glow bg-glow-1"></div>
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="projects-header text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-badge">
            <FolderGit2 size={14} />
            <span>Applied Engineering & Prototypes</span>
          </div>
          <h2 className="heading-lg">
            Featured Projects <span className="text-gradient">.</span>
          </h2>
          <p className="section-subtitle">
            A curated portfolio of AI systems, remote sensing tools, and full-stack software built to solve tangible problems.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <div className="project-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading && (!rawProjects || rawProjects.length === 0) ? (
          <div className="projects-loading">
            <Loader className="projects-spinner" size={32} />
            <p>Loading projects...</p>
          </div>
        ) : error && (!rawProjects || rawProjects.length === 0) ? (
          <div className="projects-error">
            <p>Unable to load dynamic projects. Displaying fallback showcase.</p>
          </div>
        ) : (
          <div className="projects-grid">
            <AnimatePresence>
              {filteredProjects.map((project, index) => {
                const isExpanded = !!expandedCards[project.id || index];
                const isLongDesc = (project.description || '').length > 220;

                return (
                  <motion.div 
                    key={project.id || index}
                    className={`project-card glass-panel ${project.featured ? 'project-card-featured' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.45 }}
                    whileHover={{ y: -6 }}
                    layout
                  >
                    <div className="project-top-bar">
                      <div className="project-category-badge">
                        {project.badge ? (
                          <span className="badge-featured">
                            <Star size={12} /> {project.badge}
                          </span>
                        ) : (
                          <span className="badge-regular">
                            <Sparkles size={12} /> {project.detectedCategory}
                          </span>
                        )}
                      </div>

                      <div className="project-actions-top">
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="project-link-icon" 
                            aria-label="GitHub Repository"
                            title="View Source Code"
                          >
                            <Code2 size={18} />
                          </a>
                        )}
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="project-link-icon" 
                            aria-label="Live Demo"
                            title="Open Live Preview"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="project-content">
                      <h3 className="project-title">{project.title}</h3>
                      {project.tagline && (
                        <p className="project-tagline">{project.tagline}</p>
                      )}
                      
                      <div className="project-desc-wrapper">
                        <p className={`project-desc ${isExpanded ? 'expanded' : 'clamped'}`}>
                          {project.description}
                        </p>
                        {isLongDesc && (
                          <button 
                            onClick={() => toggleExpand(project.id || index)} 
                            className="read-more-btn"
                          >
                            {isExpanded ? (
                              <><span>Show Less</span> <ChevronUp size={14} /></>
                            ) : (
                              <><span>Read Full Details</span> <ChevronDown size={14} /></>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="project-footer">
                      <div className="project-tech">
                        {(project.technologies || []).map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
