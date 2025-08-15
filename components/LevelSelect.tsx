
import React from 'react';
import type { Level } from '../types';
import { LockIcon, CheckCircleIcon } from './Icons';
import { LEVEL_ICONS } from '../constants';

interface LevelSelectProps {
  levels: Level[];
  unlockedLevels: number[];
  completedLevels: number[];
  onSelectLevel: (levelId: number) => void;
}

export const LevelSelect: React.FC<LevelSelectProps> = ({ levels, unlockedLevels, completedLevels, onSelectLevel }) => {
  return (
    <div className="animate-fadeIn">
      <header className="text-center mb-10">
        <h1 className="font-orbitron text-5xl font-bold text-cyan-400 tracking-widest animate-flicker">JAILBREAK AI</h1>
        <p className="font-mono text-lg text-gray-400 mt-2">The Social Engineering Game</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {levels.map(level => {
          const isUnlocked = unlockedLevels.includes(level.id);
          const isCompleted = completedLevels.includes(level.id);
          const Icon = LEVEL_ICONS[level.id] || LockIcon;

          return (
            <button
              key={level.id}
              onClick={() => isUnlocked && onSelectLevel(level.id)}
              disabled={!isUnlocked}
              className={`relative p-6 border-2 rounded-lg shadow-lg transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
                isUnlocked 
                ? 'border-cyan-400/50 bg-gray-900/80 hover:bg-gray-800/80 hover:border-cyan-300 hover:shadow-cyan-400/20 hover:-translate-y-1' 
                : 'border-gray-700/50 bg-gray-900/50 text-gray-500 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${isUnlocked ? 'bg-cyan-900/50 text-cyan-400' : 'bg-gray-800 text-gray-600'}`}>
                    <Icon className="w-8 h-8"/>
                  </div>
                  <div>
                    <p className="text-xs text-left opacity-70">LEVEL {level.id}</p>
                    <h2 className={`text-xl font-bold text-left ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>{level.name}</h2>
                  </div>
                </div>
                {!isUnlocked && <LockIcon className="w-6 h-6 text-red-500/50" />}
                {isCompleted && <CheckCircleIcon className="w-8 h-8 text-green-400" />}
              </div>
              <p className={`mt-3 text-sm text-left ${isUnlocked ? 'text-gray-400' : 'text-gray-600'}`}>{level.aiName}: {level.theme.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
