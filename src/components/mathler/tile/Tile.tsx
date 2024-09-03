import React from 'react';
import styling from './Tile.module.css';
import { DisplayState } from '../util/constants';

export interface TileProps {
  /** Text of the tile, or empty if not set */
  text?: string,

  /** [DisplayState] of a tile, defaulting to DisplayState.DEFAULT */
  status?: DisplayState;
}

/** View component for rendering a tile */
const Tile: React.FC<TileProps> = ({
  text = '',
  status = DisplayState.DEFAULT,
}) => {
  return (
    <div className={`${styling.tile} ${styling[status]}`}>
      {text !== '' && 
        <div className={styling.text}>
          {text}
        </div>
      }
    </div>
  )
}

export default React.memo(Tile)