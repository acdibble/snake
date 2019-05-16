const contains = (snake = [], obj) => {
  const len = snake.length;

  for (let i = 0; i < len; i += 1) {
    if (snake[i].x === obj.x && snake[i].y === obj.y) {
      return true;
    }
  }

  return false;
};

export default contains;
