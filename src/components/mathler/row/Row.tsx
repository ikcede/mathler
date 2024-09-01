import React from 'react';
import styling from './Row.module.css';
import Tile from '@/components/mathler/tile/Tile';
import { DisplayState } from '../util/constants';

export interface RowProps {
  /** Number of tiles in the row */
  tiles: number,

  /** Value of each tile, to be mapped by index of the character */
  value: string,

  /** The display states of each tile by index */
  displayStates?: DisplayState[],
}

/** View component for rendering a row of Tiles */
const Row: React.FC<RowProps> = ({
  tiles,
  value,
  displayStates = new Array<DisplayState>(),
}) => {
  return (
    <div className={styling.row}>
      {Array.from({length: tiles}).map((_item, index) => (
        <Tile key={index}
              text={value[index]}
              status={displayStates[index]} />
      ))}
    </div>
  )
}

export default React.memo(Row)