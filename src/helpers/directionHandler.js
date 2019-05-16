const directionHandler = (head = {}, direction) => {
  if (direction === 'left') {
    return { x: head.x - 1, y: head.y };
  }

  if (direction === 'right') {
    return { x: head.x + 1, y: head.y };
  }

  if (direction === 'up') {
    return { x: head.x, y: head.y - 1 };
  }

  return { x: head.x, y: head.y + 1 };
};

export default directionHandler;
