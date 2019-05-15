import React, { useState, useEffect } from 'react';

import Board from './components/Board';
import useInterval from './hooks/useInterval';

const getRandomCoordinates = (upper = 32, lower = 0) => ({
  x: Math.floor(Math.random() * (upper - lower)) + lower,
  y: Math.floor(Math.random() * (upper - lower)) + lower,
});

const Game = () => {
  const [snakeLocation, changeSnakeLocation] = useState([]);
  const [direction, changeDirection] = useState('left');
  const [food, updateFood] = useState({ x: null, y: null });

  const seedFood = () => {
    let { x, y } = getRandomCoordinates();

    while (snakeLocation[`${x}${y}`] != null) {
      ({ x, y } = getRandomCoordinates());
    }

    return {
      x,
      y,
    };
  };


  const init = () => {
    changeSnakeLocation([getRandomCoordinates(16, 8)]);
    updateFood(seedFood());
  };

  useInterval(() => {
    const head = snakeLocation[0];
    let newHead;
    if (direction === 'left') {
      newHead = { x: head.x - 1, y: head.y };
    } else if (direction === 'right') {
      newHead = { x: head.x + 1, y: head.y };
    } else if (direction === 'up') {
      newHead = { x: head.x, y: head.y - 1 };
    } else if (direction === 'down') {
      newHead = { x: head.x, y: head.y + 1 };
    }
    changeSnakeLocation([newHead, ...snakeLocation.slice(0, -1)]);
  }, 500);

  useEffect(() => {
    const downHandler = ({ key }) => {
      if (key === 'ArrowLeft' && direction !== 'left') {
        changeDirection('left');
      }
      if (key === 'ArrowRight' && direction !== 'right') {
        changeDirection('right');
      }
      if (key === 'ArrowDown' && direction !== 'down') {
        changeDirection('down');
      }
      if (key === 'ArrowUp' && direction !== 'up') {
        changeDirection('up');
      }
    };
    window.addEventListener('keydown', downHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [direction]);

  useEffect(() => {
    init();
  }, []);

  return (
    <Board
      food={food}
      snake={snakeLocation}
    />
  );
};

export default Game;
