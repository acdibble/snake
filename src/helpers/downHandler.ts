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
  direction: Direction,
  currentDirection: React.MutableRefObject<Direction>,
  setNewDirection: React.Dispatch<React.SetStateAction<Direction>>,
) => ({ key }: KeyboardEvent) => {
  const newDir = keyToDirectionMap[key];
  const { current } = currentDirection;
  if (
    (newDir === Direction.Left || newDir === Direction.Right)
    && (current === Direction.Up || current === Direction.Down)
    && (direction === Direction.Up || direction === Direction.Down)
  ) {
    setNewDirection(newDir);
  }
  if (
    (newDir === Direction.Up || newDir === Direction.Down)
    && (current === Direction.Left || current === Direction.Right)
    && (direction === Direction.Left || direction === Direction.Right)
  ) {
    setNewDirection(newDir);
  }
};

export default downHandler;
