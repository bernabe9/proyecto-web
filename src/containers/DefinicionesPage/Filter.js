import React from 'react';
import { func } from 'prop-types';

import alphabet from '../../constants/alphabet';

const Filter = ({ onChange }) => (
  <div className="filter">
    <span
      className="filter__letter"
      onClick={() => onChange()}
    >
      TODO
    </span>
    {alphabet.map(letter =>
      <span
        key={letter}
        className="filter__letter"
        onClick={() => onChange(letter)}
      >
        {letter}
      </span>)}
  </div>
);

Filter.propTypes = {
  onChange: func.isRequired
};

export default Filter;
