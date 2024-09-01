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

  const solutionKeyCount = React.useMemo((): {[key: string]: number} => {
    let keyCountMap: {[key: string]: number} = {};
    for (let i = 0; i < game.solution.length; i++) {
      if (keyCountMap[game.solution[i]] !== undefined) {
        keyCountMap[game.solution[i]]++;
      } else {
        keyCountMap[game.solution[i]] = 1;
      }
    }
    return keyCountMap;
  }, [game.solution]);

  const keyStates = React.useMemo((): Map<string, DisplayState> => {
    let keyStateMap = new Map<string, DisplayState>();
    let keySet = new Set<string>(game.solution.split(''));

    for (let i = 0; i < game.guesses.length; i++) {
      let guess = game.guesses[i];
      
      for (let j = 0; j < guess.length; j++) {
        if (guess[j] === game.solution[j]) {
          keyStateMap.set(guess[j], DisplayState.CORRECT);
        } else if (keySet.has(guess[j])) {
          if (keyStateMap.get(guess[j]) !== DisplayState.CORRECT) {
            keyStateMap.set(guess[j], DisplayState.PRESENT)
          }
        } else {
          keyStateMap.set(guess[j], DisplayState.ABSENT);
        }
      }
    }

    return keyStateMap;
  }, [game]);

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
    let keyCounts = {...solutionKeyCount};
    
    if (index >= game.guesses.length) {
      return displayStates;
    }

    let guess = game.guesses[index];

    // Loop twice, first to check for corrects and then presents
    for (let i = 0; i < solution.length; i++) {
      if (guess[i] === solution[i]) {
        displayStates[i] = DisplayState.CORRECT;
        keyCounts[guess[i]]--;
      }
    }

    for (let i = 0; i < solution.length; i++) {
      if (displayStates[i] !== DisplayState.CORRECT) {
        if (keyCounts[guess[i]] !== undefined &&
            keyCounts[guess[i]] > 0) {
          keyCounts[guess[i]]--;
          displayStates[i] = DisplayState.PRESENT;
        } else {
          displayStates[i] = DisplayState.ABSENT;
        }
      }
    }
    return displayStates;
  }, [game.guesses, game.solution]);

  return (
    <>
      <div className={styling.tiles}>
        {Array.from({length: game.maxGuesses}).map((_item, index) => (
          <Row key={index}
               tiles={tilesPerRow}
               value={getValue(index)} 
               displayStates={getDisplayStatesForRow(index)}/>
        ))}
      </div>
      <Keyboard keyboard={keyboard}
                keyStates={keyStates}
                onKeyInput={onKeyInput} />
    </>
  )
}

export default Game