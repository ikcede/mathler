import React from 'react';
import styling from './Row.module.css';
import Tile from '@/components/mathler/tile/Tile';
import { DisplayState } from '../util/constants';

export interface RowProps {
  /** Value of each [Tile], to be mapped by index of the character */
  value: string;

  /**
   * The [DisplayState]s of each [Tile] by index
   *
   * The array length also determines how many tiles to render
   */
  displayStates: DisplayState[];
}

/** View component for rendering a row of [Tile]s */
const Row: React.FC<RowProps> = ({
  value,
  displayStates = new Array<DisplayState>(),
}) => {
  return (
    <div className={styling.row}>
      {displayStates.map((state, index) => (
        <Tile key={index} text={value[index]} status={state} />
      ))}
    </div>
  );
};

export default React.memo(Row);
