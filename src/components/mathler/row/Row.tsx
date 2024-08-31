import React from 'react';
import styling from './Row.module.css';
import Tile from '@/components/mathler/tile/Tile';

export interface RowProps {
  tiles: number,
  value: string,
  solution: string,
  submitted?: boolean,
}

const Row: React.FC<RowProps> = ({
  tiles,
  value,
  solution,
  submitted,
}) => {

  /** Builds a set of all the chars in the solution */
  const presentKeys = React.useMemo(() => {
    return new Set<string>(value.split(''));
  }, [value]);

  /** Determine the status of a tile */
  const getTileStatus = React.useCallback((index: number): 'default' | 'absent' | 'correct' | 'present' => {
    if (!submitted) {
      return 'default';
    }

    if (value[index] !== undefined && value[index] === solution[index]) {
      return 'correct';
    }

    if (value[index] !== undefined && presentKeys.has(value[index])) {
      return 'present';
    }

    return 'absent';
  }, [value, solution, submitted]);

  return (
    <div className={styling.row}>
      {Array.from({length: tiles}).map((_item, index) => (
        <Tile key={index}
              text={value[index]}
              status={getTileStatus(index)} />
      ))}
    </div>
  )
}

export default Row