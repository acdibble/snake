const toggleClass = ({ x, y }: Segment, className: 'snake' | 'food'): void => {
  document.getElementById(`${x},${y}`)?.classList.toggle(className);
};

export default toggleClass;
