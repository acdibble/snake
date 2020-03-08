const getRandomNumber = (upper: number, lower: number = 0): number => (
  Math.floor(Math.random() * (upper - lower)) + lower
);

export const getRandomCoordinates = (upper: number = 32, lower: number = 0) => ({
  x: getRandomNumber(upper, lower),
  y: getRandomNumber(upper, lower),
});

export const getRandomDirection = (): Direction => getRandomNumber(4);
