import React from 'react';

const keys: Record<string, Direction> = {
  ArrowUp: Direction.Up,
  ArrowRight: Direction.Right,
  ArrowDown: Direction.Down,
  ArrowLeft: Direction.Left,
};

const downHandler = (
  direction: Direction,
  currentDirection: React.MutableRefObject<Direction>,
  fn: React.Dispatch<React.SetStateAction<Direction>>,
) => ({ key }: KeyboardEvent) => {
  const newDir = keys[key];
  const { current } = currentDirection;
  if (
    (newDir === Direction.Left || newDir === Direction.Right)
    && (current === Direction.Up || current === Direction.Down)
    && (direction === Direction.Up || direction === Direction.Down)
  ) {
    fn(newDir);
  }
  if (
    (newDir === Direction.Up || newDir === Direction.Down)
    && (current === Direction.Left || current === Direction.Right)
    && (direction === Direction.Left || direction === Direction.Right)
  ) {
    fn(newDir);
  }
};

export default downHandler;
