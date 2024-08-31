'use client'

import React from 'react';
import Mathler from '@/game/Mathler'
import Keyboard from '@/components/mathler/keyboard/Keyboard';
import Row from '@/components/mathler/row/Row';
import styling from './Game.module.css';

const keyboard = [
  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  ['Enter', '+', '-', '*', '/', 'Delete']
];

const Game: React.FC = () => {
  const [game, setGame] = React.useState(Mathler.newGame());

  return (
    <div>
      <div className={styling.tiles}>
        <Row tiles={6} value={'123***'} solution={'1+53-4'} submitted></Row>
        <Row tiles={6} value={'123***'} solution={'1+53-4'}></Row>
      </div>
      <Keyboard keyboard={keyboard}></Keyboard>
    </div>
  )
}

export default Game