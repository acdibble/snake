import { getRandomCoordinates } from './randoms';

const seedSnake = (direction: Direction): Segment[] => {
  const head = getRandomCoordinates(16, 8);

  switch (direction) {
    case Direction.Right:
      return [head, { x: head.x - 1, y: head.y }, { x: head.x - 2, y: head.y }];
    case Direction.Left:
      return [head, { x: head.x + 1, y: head.y }, { x: head.x + 2, y: head.y }];
    case Direction.Up:
      return [head, { x: head.x, y: head.y + 1 }, { x: head.x, y: head.y + 2 }];
    default:
      return [head, { x: head.x, y: head.y - 1 }, { x: head.x, y: head.y - 2 }];
  }
};

export default seedSnake;
