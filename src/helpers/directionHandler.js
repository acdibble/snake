const directionHandler = (head = {}, direction) => {
  switch (direction) {
    case 'left':
      return { x: head.x - 1, y: head.y };
    case 'right':
      return { x: head.x + 1, y: head.y };
    case 'up':
      return { x: head.x, y: head.y - 1 };
    default:
      return { x: head.x, y: head.y + 1 };
  }
};

export default directionHandler;
