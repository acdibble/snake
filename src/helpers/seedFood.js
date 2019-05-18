import { getRandomCoordinates } from './randoms';
import contains from './contains';

const seedFood = (snake, newSnake) => {
  let coord = getRandomCoordinates();

  while (contains(newSnake || snake, coord)) {
    coord = getRandomCoordinates();
  }

  return coord;
};

export default seedFood;
