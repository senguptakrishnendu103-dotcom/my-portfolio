import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  LogIn,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  ExternalLink,
  Code2,
  ArrowLeft,
  Loader,
  AlertCircle,
  CheckCircle,
  FolderOpen,
} from 'lucide-react';
import { auth, googleProvider, db } from '../firebase';
import { useProjects } from '../hooks/useProjects';
import './AdminPanel.css';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

const emptyForm = {
  title: '',
  description: '',
  technologies: '',
  link: '',
  github: '',
};

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const { projects, loading: projectsLoading } = useProjects();

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      showToast('Sign in failed: ' + error.message, 'error');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setShowForm(false);
      setFormData(emptyForm);
      setEditingId(null);
    } catch (error) {
      showToast('Sign out failed: ' + error.message, 'error');
    }
  };

  const isAuthorized = user && user.email === ADMIN_EMAIL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      showToast('Title and description are required', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const techArray = formData.technologies
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const projectData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        technologies: techArray,
        link: formData.link.trim(),
        github: formData.github.trim(),
        updatedAt: serverTimestamp(),
      };

      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), projectData);
        showToast('Project updated successfully!');
      } else {
        projectData.createdAt = serverTimestamp();
        await addDoc(collection(db, 'projects'), projectData);
        showToast('Project added successfully!');
      }

      // Reset form
      setFormData(emptyForm);
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      showToast('Error saving project: ' + error.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title || '',
      description: project.description || '',
      technologies: (project.technologies || []).join(', '),
      link: project.link || '',
      github: project.github || '',
    });
    setEditingId(project.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (projectId) => {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
      setDeleteConfirm(null);
      showToast('Project deleted successfully!');
    } catch (error) {
      showToast('Error deleting project: ' + error.message, 'error');
    }
  };

  const handleCancelForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  // ─── LOADING STATE ──────────────────────────────────────
  if (authLoading) {
    return (
      <div className="admin-wrapper">
        <div className="admin-loading">
          <Loader className="spin" size={40} />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // ─── LOGIN SCREEN ──────────────────────────────────────
  if (!user) {
    return (
      <div className="admin-wrapper">
        <div className="bg-glow bg-glow-1"></div>
        <div className="bg-glow bg-glow-2"></div>
        <motion.div
          className="admin-login glass-panel"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="admin-login-icon">
            <div className="login-icon-ring">
              <LogIn size={32} />
            </div>
          </div>
          <h1 className="heading-lg">
            Admin <span className="text-gradient">Access</span>
          </h1>
          <p className="admin-login-subtitle">
            Sign in with your authorized Google account to manage projects.
          </p>
          <button className="btn-primary" onClick={handleSignIn} id="admin-signin-btn">
            <LogIn size={18} />
            Sign in with Google
          </button>
          <a href="/" className="admin-back-link">
            <ArrowLeft size={16} /> Back to Portfolio
          </a>
        </motion.div>
      </div>
    );
  }

  // ─── UNAUTHORIZED ──────────────────────────────────────
  if (!isAuthorized) {
    return (
      <div className="admin-wrapper">
        <div className="bg-glow bg-glow-1"></div>
        <motion.div
          className="admin-login glass-panel"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="admin-login-icon">
            <div className="login-icon-ring unauthorized">
              <AlertCircle size={32} />
            </div>
          </div>
          <h1 className="heading-lg">Access Denied</h1>
          <p className="admin-login-subtitle">
            <strong>{user.email}</strong> is not authorized. Only the portfolio owner can access this panel.
          </p>
          <div className="admin-login-actions">
            <button className="btn-primary" onClick={handleSignOut}>
              <LogOut size={18} />
              Sign Out
            </button>
            <a href="/" className="admin-back-link">
              <ArrowLeft size={16} /> Back to Portfolio
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── ADMIN DASHBOARD ──────────────────────────────────
  return (
    <div className="admin-wrapper">
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={`admin-toast ${toast.type}`}
            initial={{ opacity: 0, y: -40, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -40, x: '-50%' }}
            transition={{ duration: 0.3 }}
          >
            {toast.type === 'success' ? (
              <CheckCircle size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="admin-container">
        {/* Header */}
        <motion.header
          className="admin-header glass-panel"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="admin-header-left">
            <a href="/" className="admin-logo-link">
              <ArrowLeft size={18} />
            </a>
            <div>
              <h1 className="admin-title">
                Project <span className="text-gradient">Manager</span>
              </h1>
              <p className="admin-subtitle">
                Manage your portfolio projects • {projects.length} project
                {projects.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <div className="admin-header-right">
            <div className="admin-user-info">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="admin-avatar"
                referrerPolicy="no-referrer"
              />
              <span className="admin-user-name">{user.displayName}</span>
            </div>
            <button
              className="btn-ghost"
              onClick={handleSignOut}
              id="admin-signout-btn"
            >
              <LogOut size={16} />
            </button>
          </div>
        </motion.header>

        {/* Add/Edit Form Toggle */}
        {!showForm && (
          <motion.button
            className="btn-primary btn-add-project"
            onClick={() => setShowForm(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            id="admin-add-project-btn"
          >
            <Plus size={20} />
            Add New Project
          </motion.button>
        )}

        {/* Project Form */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              className="admin-form glass-panel"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <div className="form-header">
                <h2>
                  {editingId ? (
                    <>
                      <Edit3 size={20} /> Edit Project
                    </>
                  ) : (
                    <>
                      <Plus size={20} /> New Project
                    </>
                  )}
                </h2>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={handleCancelForm}
                  aria-label="Cancel"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="project-title">Project Title *</label>
                  <input
                    id="project-title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., AI Career Counsellor"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="project-description">Description *</label>
                  <textarea
                    id="project-description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe what this project does, the problem it solves, and your role..."
                    rows={4}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="project-technologies">
                    Technologies{' '}
                    <span className="label-hint">(comma separated)</span>
                  </label>
                  <input
                    id="project-technologies"
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleInputChange}
                    placeholder="e.g., React, Firebase, Node.js, Gemini AI"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="project-link">
                    <ExternalLink size={14} /> Live Demo URL
                  </label>
                  <input
                    id="project-link"
                    type="url"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    placeholder="https://..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="project-github">
                    <Code2 size={14} /> GitHub URL
                  </label>
                  <input
                    id="project-github"
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={handleCancelForm}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                  id="admin-save-project-btn"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="spin" size={16} />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      {editingId ? 'Update Project' : 'Save Project'}
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Projects List */}
        <motion.section
          className="admin-projects-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="admin-section-title">
            Your Projects{' '}
            <span className="project-count">{projects.length}</span>
          </h2>

          {projectsLoading ? (
            <div className="admin-loading-inline">
              <Loader className="spin" size={24} />
              <span>Loading projects...</span>
            </div>
          ) : projects.length === 0 ? (
            <div className="admin-empty glass-panel">
              <FolderOpen size={48} />
              <h3>No Projects Yet</h3>
              <p>Click "Add New Project" above to showcase your first project!</p>
            </div>
          ) : (
            <div className="admin-projects-list">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="admin-project-card glass-panel"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <div className="admin-card-body">
                    <div className="admin-card-info">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="admin-card-tech">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="admin-card-actions">
                      <button
                        className="btn-icon btn-edit"
                        onClick={() => handleEdit(project)}
                        aria-label="Edit project"
                      >
                        <Edit3 size={16} />
                      </button>
                      {deleteConfirm === project.id ? (
                        <div className="delete-confirm">
                          <span>Delete?</span>
                          <button
                            className="btn-icon btn-delete-yes"
                            onClick={() => handleDelete(project.id)}
                            aria-label="Confirm delete"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            className="btn-icon"
                            onClick={() => setDeleteConfirm(null)}
                            aria-label="Cancel delete"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn-icon btn-delete"
                          onClick={() => setDeleteConfirm(project.id)}
                          aria-label="Delete project"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default AdminPanel;
