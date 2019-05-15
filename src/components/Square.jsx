import React from 'react';
import PropTypes from 'prop-types';

const Square = ({ color, x, y }) => {
  return (
    <div
      className="square"
      style={{ backgroundColor: color }}
      x={x}
      y={y}
    />
  );
};

Square.propTypes = {
  color: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Square;
