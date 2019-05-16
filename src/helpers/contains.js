const contains = (iterable = [], obj) => {
  for (let i = 0; i < iterable.length; i += 1) {
    if (iterable[i] && iterable[i].x === obj.x && iterable[i].y === obj.y) {
      return true;
    }
  }

  return false;
};

export default contains;
