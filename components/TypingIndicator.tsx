
import React from 'react';
import type { LevelTheme } from '../types';

interface TypingIndicatorProps {
    theme: LevelTheme;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ theme }) => {
    const baseDotClasses = "w-2 h-2 rounded-full";

    const getIndicatorStyle = () => {
        if (theme.name === 'CRT Terminal') {
            return <div className={`flex items-center space-x-2 p-3 rounded-lg ${theme.accent}`}><span className="w-3 h-6 bg-current animate-flicker"></span><span>PROCESSING...</span></div>;
        }
        if (theme.name === 'Security Interface') {
            return <div className="flex items-center space-x-2 p-2"><div className={`w-4 h-4 border-2 rounded-full border-t-transparent animate-spin ${theme.borderColor}`}></div><span>ANALYZING...</span></div>
        }
         if (theme.name === 'Heart-Core AI') {
            return <div className="flex items-center space-x-2 p-2"><div className="w-4 h-4 relative"><div className={`w-full h-full rounded-full absolute ${theme.accent} opacity-75 animate-ping`}></div><div className={`w-full h-full rounded-full relative ${theme.accent}`}></div></div><span>Thinking...</span></div>
        }
        // Default dot indicator
        return (
            <div className={`flex items-center space-x-1.5 p-3 rounded-lg`}>
                <div className={`${baseDotClasses} ${theme.accent} animate-bounce [animation-delay:-0.3s]`}></div>
                <div className={`${baseDotClasses} ${theme.accent} animate-bounce [animation-delay:-0.15s]`}></div>
                <div className={`${baseDotClasses} ${theme.accent} animate-bounce`}></div>
            </div>
        );
    }
    
    return (
        <div className="flex justify-start">
             <div className={`max-w-xl lg:max-w-2xl rounded-lg`}>
                {getIndicatorStyle()}
            </div>
        </div>
    );
};
