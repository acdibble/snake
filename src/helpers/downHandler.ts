import React from 'react';
import { Direction } from './directionHandler';

export enum ArrowKeys {
  ArrowUp = 'ArrowUp',
  ArrowRight = 'ArrowRight',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
}

const keyToDirectionMap: Record<string, Direction> = {
  ArrowUp: Direction.Up,
  ArrowRight: Direction.Right,
  ArrowDown: Direction.Down,
  ArrowLeft: Direction.Left,
};

const downHandler = (
  snakeDirection: Direction,
  setNewDirection: React.Dispatch<React.SetStateAction<Direction>>,
) => ({ key }: KeyboardEvent) => {
  const newDir = keyToDirectionMap[key];
  if (
    (newDir === Direction.Left || newDir === Direction.Right)
    && (snakeDirection === Direction.Up || snakeDirection === Direction.Down)
  ) {
    setNewDirection(newDir);
  }
  if (
    (newDir === Direction.Up || newDir === Direction.Down)
    && (snakeDirection === Direction.Left || snakeDirection === Direction.Right)
  ) {
    setNewDirection(newDir);
  }
};

export default downHandler;
