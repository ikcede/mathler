'use client';

import React from 'react';
import GameState from '@/game/GameState';
import Game from '../mathler/game/Game';
import Mathler from '@/game/Mathler';
import GameControls from '../game-controls/GameControls';
import Loading from '@/components/loading/Loading';
import Button from '@mui/material/Button';

const GameWrapper: React.FC = () => {
  const [game, setGame] = React.useState<GameState | null>(null);

  const startNewGame = React.useCallback((e: React.MouseEvent) => {
    setGame(
      Mathler.newGame({
        generator: 'test',
      })
    );
  }, []);

  React.useEffect(() => {
    setGame(
      Mathler.newGame({
        generator: 'test',
      })
    );
  }, []);

  return (
    <>
      <GameControls />
      {game == null && <Loading />}
      {game !== null && (
        <>
          <Game initialState={game} />
          <Button onClick={startNewGame}>New Game</Button>
        </>
      )}
    </>
  );
};

export default GameWrapper;
