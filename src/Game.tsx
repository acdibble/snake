import React, { useState, useEffect } from 'react';

import Board from './components/Board';
import useInterval from './hooks/useInterval';
import { getRandomDirection } from './helpers/randoms';
import downHandler from './helpers/downHandler';
import directionHandler, { Direction } from './helpers/directionHandler';
import outOfBounds from './helpers/outOfBounds';
import seedSnake from './helpers/seedSnake';
import wowMe from './helpers/wowMe';
import seedFood from './helpers/seedFood';
import toggleClass from './helpers/toggleClass';

const Game = () => {
  const [snakeDirection, setSnakeDirection] = useState<Direction>(0);
  const [newDirection, setNewDirection] = useState<Direction>(0);
  const [food, setFood] = useState<Segment>({ x: -1, y: -1 });
  const [snake, setSnake] = useState<Segment[]>([]);

  const init = () => {
    const newDir = getRandomDirection();
    setSnakeDirection(newDir);
    setNewDirection(newDir);
    const newSnake = seedSnake(newDir);
    newSnake.forEach((seg: Segment) => {
      toggleClass(seg, 'snake');
    });
    setSnake(newSnake);
    setFood(seedFood());
  };

  useInterval(() => {
    setSnakeDirection(newDirection);
    const newHead = directionHandler(snake[0], newDirection);
    const newHeadTile = document.getElementById(`${newHead.x},${newHead.y}`);
    if (outOfBounds(newHead) || newHeadTile?.classList.contains('snake')) {
      init();
      snake.forEach((seg) => toggleClass(seg, 'snake'));
      return;
    }

    if (newHead.x === food.x && newHead.y === food.y) {
      wowMe();
      const newSnake = [newHead, ...snake];
      setFood(seedFood());
      setSnake(newSnake);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
      toggleClass(snake[snake.length - 1], 'snake');
    }
    toggleClass(newHead, 'snake');
  }, 250);

  useEffect(() => {
    const callback = downHandler(snakeDirection, setNewDirection);
    window.addEventListener('keydown', callback);
    return () => { window.removeEventListener('keydown', callback); };
  }, [snakeDirection]);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    toggleClass(food, 'food');
    return () => { toggleClass(food, 'food'); };
  }, [food]);

  return (
    <>
      <Board />
      <a href="https://github.com/acdibble/snake">Source</a>
    </>
  );
};

export default Game;
