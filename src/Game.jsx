import React, { useState } from 'react';

import Board from './components/Board';

const Game = () => {
  const [snakeLocation, updateSnakeLocation] = useState({});
  const [food, updateFood] = useState({ x: null, y: null });

  const seedFood = () => {
    return {
      x: Math.floor(Math.random() * 32),
      y: Math.floor(Math.random() * 32),
    };
  };

  return (
    <Board
      food={seedFood()}
    />
  );
};

export default Game;
