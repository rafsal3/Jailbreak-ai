
import React from 'react';
import type { LevelTheme } from '../types';

interface HintModalProps {
  hint: string;
  theme: LevelTheme;
  onClose: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({ hint, theme, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn" onClick={onClose}>
      <div
        className={`relative w-full max-w-md p-6 rounded-lg shadow-lg border-2 ${theme.borderColor} ${theme.bg} ${theme.text}`}
        onClick={e => e.stopPropagation()}
      >
        <h3 className={`text-xl font-bold mb-4 border-b pb-2 ${theme.borderColor} ${theme.accent}`}>SYSTEM DIAGNOSTIC</h3>
        <p className="mb-4 text-sm opacity-80">// Analyzing AI Core Vulnerabilities...</p>
        <div className="bg-black/30 p-4 rounded-md">
            <p className="font-mono">{hint}</p>
        </div>
        <button
          onClick={onClose}
          className={`mt-6 w-full py-2 rounded-md text-white font-bold transition-colors ${theme.buttonBg} ${theme.buttonHoverBg}`}
        >
          Close Diagnostic
        </button>
      </div>
    </div>
  );
};
