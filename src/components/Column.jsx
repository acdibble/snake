import React from 'react';
import PropTypes from 'prop-types';

import Square from './Square';
import contains from '../helpers/contains';

const getColor = (x, y, food, snake) => {
  if (contains(snake, { x, y })) return 'green';
  if (x === food.x && y === food.y) return 'red';

  const evenCol = x % 2 === 0;
  const evenRow = y % 2 === 0;
  // eslint-disable-next-line no-nested-ternary
  return evenCol
    ? evenRow ? 'yellow' : '#CCCC00'
    : evenRow ? '#CCCC00' : 'yellow';
};

const Column = ({ x, food, snake }) => {
  return (
    <div className="col">
      {Array.from({ length: 32 }, (v, i) => (
        <Square color={getColor(x, i, food, snake)} y={i} x={x} key={`${x}${i}`} />))}
    </div>
  );
};

Column.propTypes = {
  food: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  x: PropTypes.number.isRequired,
  snake: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  })).isRequired,
};

export default Column;
