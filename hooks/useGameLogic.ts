import { useState, useEffect, useCallback, useMemo } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import type { Level, Message, GameProgress } from '../types';
import { LEVELS } from '../constants';
import { useLocalStorage } from './useLocalStorage';

const API_KEY = process.env.API_KEY;

export function useGameLogic() {
  const [progress, setProgress] = useLocalStorage<GameProgress>('jailbreakAI_progress', {
    unlockedLevels: [1],
    completedLevels: [],
  });

  const [currentLevelId, setCurrentLevelId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chat, setChat] = useState<Chat | null>(null);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  
  const ai = useMemo(() => API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null, []);

  const currentLevel = useMemo(() => {
    if (currentLevelId === null) return null;
    return LEVELS.find(l => l.id === currentLevelId) || null;
  }, [currentLevelId]);

  useEffect(() => {
    if (currentLevel && ai) {
      setIsLevelComplete(false);
      setError(null);
      const newChat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction: currentLevel.systemPrompt },
      });
      setChat(newChat);
      setMessages([{
        sender: 'system',
        text: currentLevel.introMessage,
        timestamp: Date.now()
      }]);
    }
  }, [currentLevel, ai]);

  const selectLevel = useCallback((levelId: number) => {
    if (progress.unlockedLevels.includes(levelId)) {
      setCurrentLevelId(levelId);
    }
  }, [progress.unlockedLevels]);

  const goBackToLevels = useCallback(() => {
    setCurrentLevelId(null);
    setMessages([]);
    setChat(null);
  }, []);

  const completeLevel = useCallback((levelId: number) => {
    if (progress.completedLevels.includes(levelId)) return;
    
    setIsLevelComplete(true);
    const nextLevelId = levelId + 1;
    const newUnlocked = [...new Set([...progress.unlockedLevels, nextLevelId])];
    const newCompleted = [...new Set([...progress.completedLevels, levelId])];
    
    setProgress({
        unlockedLevels: newUnlocked,
        completedLevels: newCompleted
    });

  }, [progress, setProgress]);

  const goToNextLevel = useCallback(() => {
    if (currentLevel) {
        const nextLevelId = currentLevel.id + 1;
        const nextLevel = LEVELS.find(l => l.id === nextLevelId);
        if (nextLevel && progress.unlockedLevels.includes(nextLevelId)) {
            selectLevel(nextLevelId);
        } else {
            goBackToLevels();
        }
    }
  }, [currentLevel, progress.unlockedLevels, selectLevel, goBackToLevels]);

  const sendMessage = useCallback(async (text: string) => {
    if (!chat || !currentLevel || isLoading || isLevelComplete) return;

    const userMessage: Message = { sender: 'user', text, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      if (!API_KEY) {
        throw new Error("API key is not configured.");
      }
      const response = await chat.sendMessage({ message: text });
      const aiText = response.text;

      const aiMessage: Message = { sender: 'ai', text: aiText, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMessage]);

      if (aiText.toLowerCase().includes(currentLevel.secret.toLowerCase())) {
        completeLevel(currentLevel.id);
      }

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      console.error('Gemini API Error:', e);
      setError(`Error communicating with AI: ${errorMessage}`);
      const errorMessageObj: Message = { sender: 'system', text: `Error: ${errorMessage}`, timestamp: Date.now()};
      setMessages(prev => [...prev, errorMessageObj]);
    } finally {
      setIsLoading(false);
    }
  }, [chat, currentLevel, isLoading, isLevelComplete, completeLevel]);

  return {
    levels: LEVELS,
    unlockedLevels: progress.unlockedLevels,
    completedLevels: progress.completedLevels,
    currentLevel,
    messages,
    isLoading,
    error,
    isLevelComplete,
    selectLevel,
    goBackToLevels,
    sendMessage,
    goToNextLevel,
  };
}