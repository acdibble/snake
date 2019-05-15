import React from 'react';
import PropTypes from 'prop-types';

import Column from './Column';

const Board = ({ food, snake }) => {
  return (
    <div className="board">
      {Array.from({ length: 32 }, (v, i) => <Column x={i} food={food} key={i} snake={snake} />)}
    </div>
  );
};

Board.propTypes = {
  food: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  snake: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  })).isRequired,
};

export default Board;
