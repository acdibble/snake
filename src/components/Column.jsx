import React from 'react';
import PropTypes from 'prop-types';

import contains from '../helpers/contains';

const getColor = (x, y, food, snake) => {
  if (contains(snake, { x, y })) return 'green';
  if (x === food.x && y === food.y) return 'red';
  return (x - y) % 2 === 0 ? 'yellow' : '#CCCC00';
};

const Column = ({ x, food, snake }) => {
  return (
    <div className="col">
      {Array.from({ length: 32 }, (v, i) => {
        const color = getColor(x, i, food, snake);
        return (
          <div
            style={{
              backgroundColor: color,
            }}
            key={`${x}${i}`}
            className="square"
          />
        );
      })}
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
