import React, { useState, useEffect, useRef } from 'react';

import Board from './components/Board';
import useInterval from './hooks/useInterval';
import contains from './helpers/contains';
import { getRandomCoordinates, getRandomDirection } from './helpers/randoms';
import downHandler from './helpers/downHandler';
import directionHandler from './helpers/directionHandler';
import outOfBounds from './helpers/outOfBounds';
import seedSnake from './helpers/seedSnake';

const Game = () => {
  const [direction, setDirection] = useState(getRandomDirection());
  const [food, setFood] = useState({ x: -1, y: -1 });
  const [tick, setTick] = useState(0);
  const [snake, setSnake] = useState([]);
  const currentDirection = useRef(direction);

  const seedFood = (newSnake) => {
    let coord = getRandomCoordinates();

    while (contains(newSnake || snake, coord)) {
      coord = getRandomCoordinates();
    }

    return coord;
  };

  const init = () => {
    const newDir = getRandomDirection();
    setDirection(newDir);
    setSnake(seedSnake(newDir));
    setFood(seedFood());
  };

  useInterval(() => {
    setTick(tick + 1);
  }, 250);

  useEffect(() => {
    currentDirection.current = direction;
    const newHead = directionHandler(snake[0], direction);
    if (outOfBounds(newHead) || contains(snake, newHead)) {
      init();
    } else if (newHead.x === food.x && newHead.y === food.y) {
      const newSnake = [newHead, ...snake];
      setFood(seedFood(newSnake));
      setSnake(newSnake);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  }, [tick]);

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
    <Board
      food={food}
      snake={snake}
    />
  );
};

export default Game;
