import React from 'react';
import { useToast } from '../../context/ToastContext';

export default function Toast() {
  const { toasts } = useToast();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div id="toastWrap">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.type === 'success' && '✓ '}
          {t.type === 'error' && '⚠️ '}
          {t.message}
        </div>
      ))}
    </div>
  );
}
