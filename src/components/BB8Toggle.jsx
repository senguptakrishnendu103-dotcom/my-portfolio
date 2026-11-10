import React from 'react';
import './BB8Toggle.css';

/**
 * BB8Toggle component — remastered RTX-ON animated BB-8 droid toggle switch
 *
 * @param {boolean} checked - Current toggle state (true = dark/night mode, false = day/light mode)
 * @param {function} onChange - Callback triggered when toggle changes
 * @param {number} size - Font size in px to scale the entire toggle proportionally (default: 16)
 * @param {string} className - Optional extra class names
 * @param {string} id - HTML ID for the checkbox input
 * @param {string} ariaLabel - Accessibility label
 */
const BB8Toggle = ({
  checked = false,
  onChange,
  size = 16,
  className = '',
  id = 'bb8-toggle-checkbox',
  ariaLabel = 'Theme toggle switch',
}) => {
  return (
    <label
      className={`bb8-toggle ${className}`}
      style={{ '--toggle-size': `${size}px` }}
      htmlFor={id}
      title={checked ? 'Switch to Day (Light Mode)' : 'Switch to Night (Dark Mode)'}
    >
      <input
        id={id}
        className="bb8-toggle__checkbox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={ariaLabel}
      />
      <div className="bb8-toggle__container">
        <div className="bb8-toggle__scenery">
          <div className="bb8-toggle__star"></div>
          <div className="bb8-toggle__star"></div>
          <div className="bb8-toggle__star"></div>
          <div className="bb8-toggle__star"></div>
          <div className="bb8-toggle__star"></div>
          <div className="bb8-toggle__star"></div>
          <div className="bb8-toggle__star"></div>
          <div className="tatto-1"></div>
          <div className="tatto-2"></div>
          <div className="gomrassen"></div>
          <div className="hermes"></div>
          <div className="chenini"></div>
          <div className="bb8-toggle__cloud"></div>
          <div className="bb8-toggle__cloud"></div>
          <div className="bb8-toggle__cloud"></div>
        </div>
        <div className="bb8">
          <div className="bb8__head-container">
            <div className="bb8__antenna"></div>
            <div className="bb8__antenna"></div>
            <div className="bb8__head"></div>
          </div>
          <div className="bb8__body"></div>
        </div>
        <div className="artificial__hidden">
          <div className="bb8__shadow"></div>
        </div>
      </div>
    </label>
  );
};

export default BB8Toggle;
