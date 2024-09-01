import React from 'react';
import styling from './Tile.module.css';
import { DisplayState } from '../util/constants';

export interface TileProps {
  text?: string,
  status?: DisplayState;
}

/** View component for rendering a tile */
const Tile: React.FC<TileProps> = ({
  text = '',
  status = DisplayState.DEFAULT,
}) => {
  return (
    <div className={`${styling.tile} ${styling[status]}`}>
      {text}
    </div>
  )
}

export default React.memo(Tile)