const getRandomNumber = (upper, lower = 0) => {
  return Math.floor(Math.random() * (upper - lower)) + lower;
};

export const getRandomCoordinates = (upper = 32, lower = 0) => ({
  x: getRandomNumber(upper, lower),
  y: getRandomNumber(upper, lower),
});

export const getRandomDirection = () => {
  switch (getRandomNumber(4)) {
    case 0:
      return 'up';
    case 1:
      return 'right';
    case 2:
      return 'down';
    default:
      return 'left';
  }
};
