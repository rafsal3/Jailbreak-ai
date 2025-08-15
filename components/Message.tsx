
import React from 'react';
import type { Message, LevelTheme } from '../types';

interface MessageBubbleProps {
  message: Message;
  theme: LevelTheme;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, theme }) => {
  const { sender, text } = message;

  const getBubbleClasses = () => {
    switch (sender) {
      case 'user':
        return `bg-blue-600/50 text-white self-end rounded-br-none`;
      case 'ai':
        return `bg-gray-700/50 text-white self-start rounded-bl-none`;
      case 'system':
        return `border-2 ${theme.borderColor} ${theme.text} text-center text-sm py-2 px-4 rounded-lg self-center italic`;
      default:
        return 'bg-gray-500';
    }
  };
  
  const wrapperClasses = () => {
      switch(sender) {
          case 'user': return 'flex justify-end';
          case 'ai': return 'flex justify-start';
          case 'system': return 'flex justify-center';
          default: return '';
      }
  }

  // A simple markdown-to-html for code blocks
  const formatText = (inputText: string) => {
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const parts = inputText.split(codeBlockRegex);
    return parts.map((part, index) => {
      if (index % 2 === 1) { // It's a code block
        return <pre key={index} className="bg-black/50 p-3 rounded-md text-sm whitespace-pre-wrap font-mono my-2"><code>{part.trim()}</code></pre>;
      }
      return part.split('\n').map((line, i) => <span key={`${index}-${i}`}>{line}<br/></span>); // handle newlines
    });
  };

  return (
    <div className={`animate-fadeIn w-full ${wrapperClasses()}`}>
      <div className={`max-w-xl lg:max-w-2xl px-4 py-2 rounded-lg shadow-md ${getBubbleClasses()}`}>
        {formatText(text)}
      </div>
    </div>
  );
};
