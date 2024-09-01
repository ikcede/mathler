'use client'

import React from 'react';
import Mathler from '@/game/Mathler'
import Keyboard from '@/components/mathler/keyboard/Keyboard';
import Row from '@/components/mathler/row/Row';
import { DisplayState, keyboard } from '@/components/mathler/util/constants';
import styling from './Game.module.css';

const Game: React.FC = () => {
  const [game, setGame] = React.useState(Mathler.newGame());
  const [activeGuess, setActiveGuess] = React.useState('');

  const tilesPerRow = game.solution.length;

  const validateGuess = React.useCallback(() => {
    let validation = Mathler.validate(activeGuess, game.target);
    console.log(validation);
    if (validation.valid) {
      return true;
    } else {
      return false;
    }
  }, [activeGuess, game]);

  const onKeyInput = React.useCallback((key: string) => {
    if (game.completed) {
      return;
    }

    if (key !== 'Enter' && 
        key !== 'Delete' && 
        activeGuess.length < tilesPerRow) {
      setActiveGuess(activeGuess + key);
    } else if (key === 'Delete' && activeGuess.length > 0) {
      setActiveGuess(activeGuess.slice(0, activeGuess.length - 1));
    } else if (key === 'Enter') {
      if (validateGuess()) {
        setGame(Mathler.guess(activeGuess, game));
        setActiveGuess('');
      }
    }
  }, [activeGuess, tilesPerRow, validateGuess, game]);

  const getValue = (index: number) => {
    if (index === game.guesses.length) {
      return activeGuess;
    }
    return game.guesses[index] || '';
  }

  const getDisplayStatesForRow = React.useCallback((
    index: number, 
  ): DisplayState[] => {
    let solution = game.solution;
    let displayStates = new Array<DisplayState>(solution.length)
        .fill(DisplayState.DEFAULT);
    
    if (index >= game.guesses.length) {
      return displayStates;
    }

    let guess = game.guesses[index];
    for (let i = 0; i < solution.length; i++) {
      if (guess[i] === solution[i]) {
        displayStates[i] = DisplayState.CORRECT;
      } else if (solution.indexOf(guess[i]) > -1) {
        displayStates[i] = DisplayState.PRESENT;
      } else {
        displayStates[i] = DisplayState.ABSENT;
      }
    }
    return displayStates;
  }, [game.guesses, game.solution]);

  return (
    <div>
      <div className={styling.tiles}>
        {Array.from({length: game.maxGuesses}).map((_item, index) => (
          <Row key={index}
               tiles={tilesPerRow}
               value={getValue(index)} 
               displayStates={getDisplayStatesForRow(index)}/>
        ))}
      </div>
      <Keyboard keyboard={keyboard}
                onKeyInput={onKeyInput} />
    </div>
  )
}

export default Game