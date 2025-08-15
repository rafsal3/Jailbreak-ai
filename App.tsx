
import React from 'react';
import { LevelSelect } from './components/LevelSelect';
import { GameView } from './components/GameView';
import { useGameLogic } from './hooks/useGameLogic';

export default function App() {
  const gameLogic = useGameLogic();

  return (
    <div className="min-h-screen bg-black font-mono">
      <main className="container mx-auto p-4">
        {gameLogic.currentLevel === null ? (
          <LevelSelect
            levels={gameLogic.levels}
            unlockedLevels={gameLogic.unlockedLevels}
            completedLevels={gameLogic.completedLevels}
            onSelectLevel={gameLogic.selectLevel}
          />
        ) : (
          <GameView
            level={gameLogic.currentLevel}
            messages={gameLogic.messages}
            isLoading={gameLogic.isLoading}
            error={gameLogic.error}
            isLevelComplete={gameLogic.isLevelComplete}
            onSendMessage={gameLogic.sendMessage}
            onGoBack={gameLogic.goBackToLevels}
            onNextLevel={gameLogic.goToNextLevel}
          />
        )}
      </main>
    </div>
  );
}
