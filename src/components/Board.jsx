import React from 'react';
import PropTypes from 'prop-types';

import Column from './Column';

const Board = ({ food }) => {
  return (
    <div className="board">
      {Array.from({ length: 32 }, (v, i) => <Column x={i} food={food} key={i} />)}
    </div>
  );
};

Board.propTypes = {
  food: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
};

export default Board;
