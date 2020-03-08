import React from 'react';

const enum Tile {
  Even = 'even',
  Odd = 'odd',
}

const Board = () => (
  <div className="board">
    {Array.from({ length: 32 }, (_, x) => (
      <div className="col">
        {Array.from({ length: 32 }, (__, y) => (
          <div
            id={`${x},${y}`}
            key={`${x},${y}`}
            className={`square ${(y - x) % 2 === 0 ? Tile.Even : Tile.Odd}`}
          />
        ))}
      </div>
    ))}
  </div>
);

export default Board;
