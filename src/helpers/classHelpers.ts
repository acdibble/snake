type Classes = 'snake' | 'food'

export const addClass = ({ x, y }: Segment, className: Classes): void => {
  document.getElementById(`${x},${y}`)?.classList.add(className);
};

export const removeClass = ({ x, y }: Segment, className: Classes): void => {
  document.getElementById(`${x},${y}`)?.classList.remove(className);
};
