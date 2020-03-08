const outOfBounds = ({ x, y }: Segment) => x < 0 || x > 31 || y < 0 || y > 31;

export default outOfBounds;
