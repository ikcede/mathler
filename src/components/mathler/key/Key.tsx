import React from 'react';
import styling from './Key.module.css';

type KeyPressedFunction = (key: string) => void;

export interface KeyProps {
  /** String value that this key represents */
  keyText: string,

  /** Whether the value is absent from the current Mathler solution */
  absent?: boolean,

  /** Called when the key is clicked */
  onKeyPressed?: KeyPressedFunction
}

const Key: React.FC<KeyProps> = ({
  keyText,
  absent = false,
  onKeyPressed = () => {}
}) => {
  let keyClasses = styling.key;
  if (absent) {
    keyClasses += ' ' + styling.absent;
  }

  return (
    <button className={keyClasses}
            onClick={() => onKeyPressed(keyText)}>
      {keyText}
    </button>
  )
}

export default Key