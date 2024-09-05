import React from 'react';
import { DisplayState } from '../util/constants';
import styling from './Key.module.css';

type KeyPressedFunction = (key: string) => void;

export interface KeyProps {
  /** String value that this key represents */
  keyText: string;

  /** Whether the value is absent from the current Mathler solution */
  display?: DisplayState;

  /** Called when the key is clicked */
  onKeyPressed?: KeyPressedFunction;
}

/** View component for rendering a single key */
const Key: React.FC<KeyProps> = ({
  keyText,
  display = DisplayState.DEFAULT,
  onKeyPressed = () => {},
}) => {
  return (
    <button
      className={styling.key + ' ' + styling[display]}
      onClick={() => onKeyPressed(keyText)}
    >
      {keyText}
    </button>
  );
};

export default React.memo(Key);
