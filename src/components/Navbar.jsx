import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import BB8Toggle from './BB8Toggle';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { name } = portfolioData.personal;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'research', 'projects', 'achievements', 'experience', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Research', href: '#research', id: 'research', highlight: true },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Achievements', href: '#achievements', id: 'achievements' },
    { name: 'Journey', href: '#experience', id: 'experience' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a 
          href="#home" 
          className="logo"
          title="Double-click to access admin panel"
          onDoubleClick={(e) => { e.preventDefault(); window.location.href = '/admin'; }}
        >
          <span className="logo-symbol">&lt;</span>
          <span className="logo-text">{name.split(' ')[0]}</span>
          <span className="logo-dot">.</span>
          <span className="logo-symbol">/&gt;</span>
        </a>

        {/* Desktop Nav */}
        <nav className="nav-links desktop-nav" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href={link.href} 
              className={`nav-link ${activeSection === link.id ? 'active' : ''} ${link.highlight ? 'nav-link-research' : ''}`}
            >
              {link.highlight && <Sparkles size={13} className="research-sparkle" />}
              <span>{link.name}</span>
            </a>
          ))}

          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noreferrer" 
            className="btn btn-sm btn-secondary nav-resume-btn"
            title="View Resume PDF"
          >
            <FileText size={14} />
            <span>Resume</span>
          </a>
          
          <BB8Toggle
            id="desktop-bb8-theme-toggle"
            checked={theme === 'dark'}
            onChange={toggleTheme}
            size={5.2}
            className="nav-bb8-toggle"
            ariaLabel="Toggle Dark and Light mode"
          />
        </nav>

        {/* Mobile Controls */}
        <div className="mobile-controls">
          <BB8Toggle
            id="mobile-header-bb8-theme-toggle"
            checked={theme === 'dark'}
            onChange={toggleTheme}
            size={4.6}
            ariaLabel="Toggle Dark and Light mode"
          />
          <button 
            className="mobile-toggle" 
            onClick={toggleMenu} 
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="mobile-nav glass-panel"
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {navLinks.map((link) => (
                <a 
                  key={link.id} 
                  href={link.href} 
                  className={`mobile-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.highlight && <Sparkles size={14} className="research-sparkle" />}
                  <span>{link.name}</span>
                </a>
              ))}
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-sm btn-primary mobile-resume-btn"
                onClick={() => setIsOpen(false)}
              >
                <FileText size={15} />
                <span>View Resume (PDF)</span>
              </a>

              <div className="mobile-theme-row">
                <span className="mobile-theme-label">
                  Theme: <strong>{theme === 'dark' ? 'Night (Dark)' : 'Day (Light)'}</strong>
                </span>
                <BB8Toggle
                  id="mobile-drawer-bb8-theme-toggle"
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                  size={5.8}
                  ariaLabel="Toggle theme"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
