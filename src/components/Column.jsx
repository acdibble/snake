import React from 'react';
import PropTypes from 'prop-types';

import Square from './Square';

const getColor = (x, y, food) => {
  if (x === food.x && y === food.y) return 'red';

  return 'yellow';
};

const Column = ({ x, food }) => {
  return (
    <div className="col">
      {Array.from({ length: 32 }, (v, i) => (
        <Square color={getColor(x, i, food)} y={i} x={x} key={`${x}${i}`} />))}
    </div>
  );
};

Column.propTypes = {
  food: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  x: PropTypes.number.isRequired,
};

export default Column;
