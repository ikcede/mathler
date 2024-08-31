import React from 'react';
import Key from '@/components/mathler/key/Key';
import styling from './Keyboard.module.css';

type KeyInputFunction = (key: string) => void;

export interface KeyboardProps {
  keyboard: string[][],
  onKeyInput?: KeyInputFunction
}

const Keyboard: React.FC<KeyboardProps> = ({
  keyboard,
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
                 onKeyPressed={onKeyPressed} />
          )}
        </div>
      )}
    
    </>
  )
}

export default Keyboard