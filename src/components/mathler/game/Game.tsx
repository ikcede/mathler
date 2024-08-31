'use client'

import React from 'react';
import Mathler from '@/game/Mathler'
import Keyboard from '@/components/mathler/keyboard/Keyboard';

const keyboard = [
  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  ['Enter', '+', '-', '*', '/', 'Delete']
];

const Game: React.FC = () => {
  const [game, setGame] = React.useState(Mathler.newGame());

  return (
    <div>
      <Keyboard keyboard={keyboard}></Keyboard>
    </div>
  )
}

export default Game