'use client'

import React from 'react';
import GameState from '@/game/GameState';
import Game from '../mathler/game/Game';
import Mathler from '@/game/Mathler';
import GameControls from '../game-controls/GameControls';
import styling from './GameWrapper.module.css';

const GameWrapper: React.FC = () => {
  const [game, setGame] = React.useState<GameState | null>(null);

  React.useEffect(() => {
    setGame(Mathler.newGame({
      generator: 'test'
    }));
  }, []);

  return (
    <>
      <GameControls />
      {game == null &&
        <div className={styling.loading}>
          Loading...
          <div className={styling.loader}></div>
        </div>
      }
      {game !== null && (
        <Game initialState={game} />
      )}
    </>
  )
}

export default GameWrapper