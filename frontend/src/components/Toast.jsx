import React from 'react';

export default function Toast({ message, visible, type = 'success' }) {
  if (!visible || !message) return null;

  return (
    <div className={`toast-notification ${type}`}>
      <span className="toast-icon">
        {type === 'success' ? '✅' : 'ℹ️'}
      </span>
      <span className="toast-message">{message}</span>
    </div>
  );
}
