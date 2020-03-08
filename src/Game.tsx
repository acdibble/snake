import React, { useState, useEffect, useRef } from 'react';

import Board from './components/Board';
import useInterval from './hooks/useInterval';
import { getRandomDirection } from './helpers/randoms';
import downHandler from './helpers/downHandler';
import directionHandler, { Direction } from './helpers/directionHandler';
import outOfBounds from './helpers/outOfBounds';
import seedSnake from './helpers/seedSnake';
import wowMe from './helpers/wowMe';
import seedFood from './helpers/seedFood';
import { addClass, removeClass } from './helpers/classHelpers';

const Game = () => {
  const [direction, setDirection] = useState<Direction>(Direction.Up);
  const currentDirection = useRef(direction);
  const [food, setFood] = useState<Segment>({ x: -1, y: -1 });
  const [snake, setSnake] = useState<Segment[]>([]);
  const [score, setScore] = useState<number>(0);

  const init = () => {
    setScore(0);
    const newDir = getRandomDirection();
    setDirection(newDir);
    currentDirection.current = newDir;
    const newSnake = seedSnake(newDir);
    newSnake.forEach((seg: Segment) => {
      addClass(seg, 'snake');
    });
    setSnake(newSnake);
    setFood(seedFood());
  };

  useInterval(() => {
    currentDirection.current = direction;
    const newHead = directionHandler(snake[0], direction);
    const newHeadTile = document.getElementById(`${newHead.x},${newHead.y}`);
    if (outOfBounds(newHead) || newHeadTile?.classList.contains('snake')) {
      Array.from(document.getElementsByClassName('snake')).forEach((el) => {
        el.classList.remove('snake');
      });
      init();
      return;
    }

    if (newHead.x === food.x && newHead.y === food.y) {
      wowMe();
      const newSnake = [newHead, ...snake];
      setFood(seedFood());
      setSnake(newSnake);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
      removeClass(snake[snake.length - 1], 'snake');
    }
    addClass(newHead, 'snake');
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

  useEffect(() => {
    setScore(score + 1);
    addClass(food, 'food');
    return () => { removeClass(food, 'food'); };
  }, [food]);

  useEffect(() => {
    console.log('Your current score:', score);
  }, [score]);

  return (
    <>
      <Board />
      <a href="https://github.com/acdibble/snake">Source</a>
    </>
  );
};

export default Game;
