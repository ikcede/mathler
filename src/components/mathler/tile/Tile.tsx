import React from 'react';
import styling from './Tile.module.css';

export interface TileProps {
  text?: string,

  // TODO: Make this an enum?
  status?: 'default' | 'absent' | 'correct' | 'present';
}

const Tile: React.FC<TileProps> = ({
  status = 'default',
  text = '',
}) => {
  return (
    <div className={`${styling.tile} ${styling[status]}`}>
      {text}
    </div>
  )
}

export default Tile