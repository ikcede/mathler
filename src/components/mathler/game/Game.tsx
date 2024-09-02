'use client'

import React from 'react';
import Mathler from '@/game/Mathler'
import Keyboard from '@/components/mathler/keyboard/Keyboard';
import Row from '@/components/mathler/row/Row';
import { DisplayState, keyboard } from '@/components/mathler/util/constants';
import styling from './Game.module.css';

const Game: React.FC = () => {
  /** Tracks the active [GameState] */
  const [game, setGame] = React.useState(Mathler.newGame());

  /** Tracks the active temporary guess before successful submit */
  const [activeGuess, setActiveGuess] = React.useState('');

  /**
   * Helper hash used to count present tiles in the case of multiple
   * occurences in an expression.
   */
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

  /** Calculates the correct [DisplayState] for [Key]s */
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

  /**
   * Delegates validation to the game engine and processes errors
   */
  const validateGuess = React.useCallback(() => {
    let validation = Mathler.validate(activeGuess, game.target);
    console.log(validation);
    if (validation.valid) {
      return true;
    } else {
      return false;
    }
  }, [activeGuess, game]);

  /**
   * Main processor for key inputs
   * 
   * Updates [activeGuess] to render inputs in [Tile]s and
   * handles special keys.
   */
  const onKeyInput = React.useCallback((key: string) => {
    if (game.completed) {
      return;
    }

    if (key !== 'Enter' && 
        key !== 'Delete' && 
        activeGuess.length < game.solution.length) {
      setActiveGuess(activeGuess + key);
    } else if (key === 'Delete' && activeGuess.length > 0) {
      setActiveGuess(activeGuess.slice(0, activeGuess.length - 1));
    } else if (key === 'Enter') {
      if (validateGuess()) {
        setGame(Mathler.guess(activeGuess, game));
        setActiveGuess('');
      }
    }
  }, [activeGuess, validateGuess, game]);

  /** Render old guesses and set the next [Row] as the [activeGuess] */
  const getValue = (index: number) => {
    if (index === game.guesses.length) {
      return activeGuess;
    }
    return game.guesses[index] || '';
  }

  /** 
   * For a specific row, generate the correct [DisplayState]s
   */
  const getDisplayStatesForRow = React.useCallback((
    index: number, 
  ): DisplayState[] => {
    let solution = game.solution;
    let displayStates = new Array<DisplayState>(solution.length)
        .fill(DisplayState.DEFAULT);
    let keyCounts = {...solutionKeyCount};
    
    // Use default [DisplayState]s for [Row]s we've yet to reach
    if (index >= game.guesses.length) {
      return displayStates;
    }

    let guess = game.guesses[index];

    // Loop twice, first to check for corrects and then presents
    // to avoid having to backtrack
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