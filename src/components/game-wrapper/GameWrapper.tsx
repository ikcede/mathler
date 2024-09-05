'use client';

import React from 'react';
import GameState from '@/game/GameState';
import Game from '../mathler/game/Game';
import Mathler from '@/game/Mathler';
import GameControls from '../game-controls/GameControls';
import Loading from '@/components/loading/Loading';
import Button from '@mui/material/Button';
import styling from './GameWrapper.module.css';

const GameWrapper: React.FC = () => {
  const [game, setGame] = React.useState<GameState | null>(null);

  /** Generates a random GameState */
  const startNewGame = () =>
    setGame(
      Mathler.newGame({
        generator: Mathler.GeneratorType.RANDOM,
      })
    );

  /** Memoized handler for the new game button */
  const onNewGameClick = React.useCallback(
    (e: React.MouseEvent) => {
      startNewGame();
    },
    [startNewGame]
  );

  React.useEffect(() => {
    startNewGame();
  }, []);

  return (
    <>
      <GameControls />
      {game == null && <Loading />}
      {game !== null && (
        <>
          <Game initialState={game} />
          <div className={styling.reset}>
            <Button onClick={onNewGameClick}>Start A New Game</Button>
          </div>
        </>
      )}
    </>
  );
};

export default GameWrapper;
