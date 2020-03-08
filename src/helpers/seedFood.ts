import { getRandomCoordinates } from './randoms';

const seedFood = () => {
  let coord = getRandomCoordinates();
  let el = document.getElementById(`${coord.x},${coord.y}`);

  while (el?.classList.contains('snake')) {
    coord = getRandomCoordinates();
    el = document.getElementById(`${coord.x},${coord.y}`);
  }

  return coord;
};

export default seedFood;
