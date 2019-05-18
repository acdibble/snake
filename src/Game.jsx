import React, { useState, useEffect, useRef } from 'react';

import Board from './components/Board';
import useInterval from './hooks/useInterval';
import contains from './helpers/contains';
import { getRandomDirection } from './helpers/randoms';
import downHandler from './helpers/downHandler';
import directionHandler from './helpers/directionHandler';
import outOfBounds from './helpers/outOfBounds';
import seedSnake from './helpers/seedSnake';
import wowMe from './helpers/wowMe';
import seedFood from './helpers/seedFood';

const Game = () => {
  const [direction, setDirection] = useState(getRandomDirection());
  const [food, setFood] = useState({ x: -1, y: -1 });
  const [snake, setSnake] = useState([]);
  const currentDirection = useRef(direction);

  const init = () => {
    const newDir = getRandomDirection();
    setDirection(newDir);
    setSnake(seedSnake(newDir));
    setFood(seedFood(snake));
  };

  useInterval(() => {
    currentDirection.current = direction;
    const newHead = directionHandler(snake[0], direction);
    if (outOfBounds(newHead) || contains(snake, newHead)) {
      init();
    } else if (newHead.x === food.x && newHead.y === food.y) {
      wowMe();
      const newSnake = [newHead, ...snake];
      setFood(seedFood(snake, newSnake));
      setSnake(newSnake);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  }, 250);

  useEffect(() => {
    const fn = downHandler(direction, currentDirection, setDirection);
    window.addEventListener('keydown', fn);
    return () => {
      window.removeEventListener('keydown', fn);
    };
  }, [direction]);

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Board
        food={food}
        snake={snake}
      />
      <a href="https://github.com/acdibble/snake">Source</a>
    </>
  );
};

export default Game;
