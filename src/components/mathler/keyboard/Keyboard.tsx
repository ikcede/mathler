import React from 'react';
import Key from '@/components/mathler/key/Key';
import { DisplayState } from '../util/constants';

import styling from './Keyboard.module.css';

type KeyInputFunction = (key: string) => void;

export interface KeyboardProps {
  /** An array of keys to be rendered row by row */
  keyboard: string[][],

  /** A map of keys to their states */
  keyStates?: Map<string, DisplayState>,

  /** Called when one of the inner keys is pressed */
  onKeyInput?: KeyInputFunction
}

/** View component for rendering a set of Keys */
const Keyboard: React.FC<KeyboardProps> = ({
  keyboard,
  keyStates = new Map<string, DisplayState>(),
  onKeyInput = () => {},
}) => {
  
  const onKeyPressed = React.useCallback((key: string) => {
    onKeyInput(key);
  }, [onKeyInput]);

  return (
    <>
      {keyboard.map((row, index) => 
        <div className={styling.row}
             key={'row-' + index}>
          {row.map((key) => 
            <Key key={key}
                 keyText={key}
                 display={keyStates.get(key)}
                 onKeyPressed={onKeyPressed} />
          )}
        </div>
      )}
    </>
  )
}

export default React.memo(Keyboard)