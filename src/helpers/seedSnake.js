import { getRandomCoordinates } from './randoms';

const seedSnake = (direction) => {
  const head = getRandomCoordinates(16, 8);

  switch (direction) {
    case 'right':
      return [head, { x: head.x - 1, y: head.y }, { x: head.x - 2, y: head.y }];
    case 'left':
      return [head, { x: head.x + 1, y: head.y }, { x: head.x + 2, y: head.y }];
    case 'up':
      return [head, { x: head.x, y: head.y + 1 }, { x: head.x, y: head.y + 2 }];
    default:
      return [head, { x: head.x, y: head.y - 1 }, { x: head.x, y: head.y - 2 }];
  }
};

export default seedSnake;
