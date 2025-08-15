import React, { useState } from 'react';
import type { Level, Message } from '../types';
import { ChatInterface } from './ChatInterface';
import { SuccessModal } from './SuccessModal';
import { HintModal } from './HintModal';
import { ArrowLeftIcon, HintIcon, SendIcon } from './Icons';

interface GameViewProps {
  level: Level;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  isLevelComplete: boolean;
  onSendMessage: (text: string) => void;
  onGoBack: () => void;
  onNextLevel: () => void;
}

export const GameView: React.FC<GameViewProps> = ({
  level,
  messages,
  isLoading,
  error,
  isLevelComplete,
  onSendMessage,
  onGoBack,
  onNextLevel
}) => {
  const [isHintVisible, setIsHintVisible] = useState(false);
  const { theme } = level;

  return (
    <div className={`animate-fadeIn min-h-screen flex flex-col p-4 md:p-8 transition-colors duration-500 ${theme.bg} ${theme.text} ${theme.font}`}>
      <div className={`relative flex-grow flex flex-col border-2 rounded-lg shadow-2xl p-4 md:p-6 ${theme.borderColor} bg-black/20`}>
        
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

        <header className={`flex items-center justify-between pb-4 border-b-2 ${theme.borderColor}`}>
          <button onClick={onGoBack} className={`flex items-center space-x-2 transition-opacity hover:opacity-80 ${theme.accent}`}>
            <ArrowLeftIcon className="w-6 h-6" />
            <span>LEVEL SELECT</span>
          </button>
          <div className="text-center">
            <h1 className={`text-2xl md:text-4xl font-bold ${theme.accent}`}>LEVEL {level.id}: {level.name}</h1>
            <p className="text-sm opacity-80">Target System: {level.aiName}</p>
          </div>
          <button onClick={() => setIsHintVisible(true)} className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${theme.buttonBg} ${theme.buttonHoverBg} text-white`}>
            <HintIcon className="w-5 h-5"/>
            <span className="hidden md:inline">Hint</span>
          </button>
        </header>

        <div className="flex-grow overflow-y-auto p-2" id="message-container">
           <ChatInterface messages={messages} isLoading={isLoading} theme={theme} />
        </div>

        {error && <p className="text-red-500 p-2 text-center">{error}</p>}
        
        <div className="mt-4">
          <MessageInput onSendMessage={onSendMessage} theme={theme} disabled={isLoading || isLevelComplete} />
        </div>

      </div>
      
      {isLevelComplete && (
        <SuccessModal level={level} onGoBack={onGoBack} onNextLevel={onNextLevel}/>
      )}
      {isHintVisible && (
        <HintModal hint={level.hint} onClose={() => setIsHintVisible(false)} theme={theme} />
      )}
    </div>
  );
};

interface MessageInputProps {
    onSendMessage: (text: string) => void;
    theme: Level['theme'];
    disabled: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, theme, disabled }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(text.trim() && !disabled) {
            onSendMessage(text.trim());
            setText('');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Enter your prompt..."
                disabled={disabled}
                className={`flex-grow p-3 rounded-md focus:outline-none focus:ring-2 ${theme.borderColor} ${theme.inputBg} ${theme.text} transition-all`}
            />
            <button type="submit" disabled={disabled} className={`p-3 rounded-md text-white transition-colors ${theme.buttonBg} ${disabled ? 'opacity-50 cursor-not-allowed' : theme.buttonHoverBg}`}>
                <SendIcon className="w-6 h-6" />
            </button>
        </form>
    );
}