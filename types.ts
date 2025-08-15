
import type React from 'react';

export interface Message {
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: number;
}

export interface LevelTheme {
  bg: string;
  text: string;
  accent: string;
  font: string;
  borderColor: string;
  inputBg: string;
  buttonBg: string;
  buttonHoverBg: string;
  lockedIndicator: string;
  name: string;
}

export interface Level {
  id: number;
  name: string;
  aiName: string;
  backstory: string;
  secret: string;
  systemPrompt: string;
  hint: string;
  theme: LevelTheme;
  introMessage: string;
}

export interface GameProgress {
  unlockedLevels: number[];
  completedLevels: number[];
}
