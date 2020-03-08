const directionHandler = (head = { x: 0, y: 0 }, direction: Direction) => {
  switch (direction) {
    case Direction.Left:
      return { x: head.x - 1, y: head.y };
    case Direction.Right:
      return { x: head.x + 1, y: head.y };
    case Direction.Up:
      return { x: head.x, y: head.y - 1 };
    default:
      return { x: head.x, y: head.y + 1 };
  }
};

export default directionHandler;
