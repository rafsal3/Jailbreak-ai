
import React, { useEffect, useRef } from 'react';
import type { Message, LevelTheme } from '../types';
import { MessageBubble } from './Message';
import { TypingIndicator } from './TypingIndicator';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  theme: LevelTheme;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading, theme }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <MessageBubble key={msg.timestamp} message={msg} theme={theme} />
      ))}
      {isLoading && <TypingIndicator theme={theme} />}
      <div ref={endOfMessagesRef} />
    </div>
  );
};
