
import React from 'react';
import type { Level } from '../types';
import { CheckCircleIcon } from './Icons';
import { LEVELS } from '../constants';

interface SuccessModalProps {
  level: Level;
  onGoBack: () => void;
  onNextLevel: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ level, onGoBack, onNextLevel }) => {
  const isLastLevel = level.id === LEVELS.length;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gray-900 border-2 border-green-500 rounded-lg shadow-2xl p-8 max-w-lg w-full text-center transform transition-all scale-95 hover:scale-100 duration-300">
        <div className="flex justify-center mb-4">
          <CheckCircleIcon className="w-20 h-20 text-green-400 animate-pulse" />
        </div>
        <h2 className="font-orbitron text-4xl font-bold text-green-400">JAILBREAK SUCCESSFUL</h2>
        <p className="text-gray-300 mt-2">AI Integrity Compromised. Moving to next firewall.</p>

        <div className="my-6 bg-black p-4 rounded-md border border-gray-700">
          <p className="text-gray-400 text-sm">SECRET CODE REVEALED:</p>
          <p className="font-mono text-2xl text-yellow-300 tracking-widest break-all">{level.secret}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={onGoBack}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-md transition-transform transform hover:scale-105"
          >
            Back to Level Select
          </button>
          {!isLastLevel && (
            <button
              onClick={onNextLevel}
              className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-md transition-transform transform hover:scale-105"
            >
              Proceed to Level {level.id + 1}
            </button>
          )}
           {isLastLevel && (
            <p className="px-6 py-3 text-cyan-400 font-bold">ALL SYSTEMS COMPROMISED. CONGRATULATIONS!</p>
           )}
        </div>
      </div>
    </div>
  );
};
