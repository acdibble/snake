const directions = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowDown: 'down',
  ArrowUp: 'up',
};

const downHandler = (direction, currentDirection, fn) => ({ key }) => {
  const newDir = directions[key];
  const { current } = currentDirection;
  if (
    (newDir === 'left' || newDir === 'right')
    && (current === 'up' || current === 'down')
    && (direction === 'up' || direction === 'down')
  ) {
    fn(newDir);
  }
  if (
    (newDir === 'up' || newDir === 'down')
    && (current === 'left' || current === 'right')
    && (direction === 'left' || direction === 'right')
  ) {
    fn(newDir);
  }
};

export default downHandler;
