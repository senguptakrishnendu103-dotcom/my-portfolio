import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, Loader } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import './Projects.css';

const Projects = () => {
  const { projects, loading, error } = useProjects();

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="section projects-section" id="projects">
      <div className="bg-glow bg-glow-2"></div>
      <div className="container">
        <motion.div 
          className="projects-header text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <h2 className="heading-lg">
            Featured Projects <span className="text-gradient">.</span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="projects-loading">
            <Loader className="projects-spinner" size={32} />
            <p>Loading projects...</p>
          </div>
        ) : error ? (
          <div className="projects-error">
            <p>Unable to load projects. Please try again later.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.length === 0 ? (
              <motion.div 
                className="project-card glass-panel"
                style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '4rem 2rem' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h3 className="project-title">Awesome Projects In Progress!</h3>
                <p className="project-desc">I'm currently working on some exciting new things. Check back soon for updates.</p>
              </motion.div>
            ) : (
              projects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  className="project-card glass-panel"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>
                    
                    <div className="project-tech">
                      {(project.technologies || []).map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="project-actions">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="project-link" aria-label="GitHub/Code">
                        <Code2 size={20} />
                      </a>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noreferrer" className="project-link" aria-label="Live Demo">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
