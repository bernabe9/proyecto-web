import React, { PureComponent } from 'react';
import { string, object } from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { exerciseComponents } from '../../constants/constants';

class ExerciseSolution extends PureComponent {
  static propTypes = {
    type: string.isRequired,
    exercise: object.isRequired,
  }

  render() {
    const { type, exercise } = this.props;
    const Component = exerciseComponents[type];

    return (
      <div>
        <Typography variant="headline" component="h3">
          Ejercicio con solución
        </Typography>
        {Component ? <Component {...exercise} /> : <p>Seleccione un ejerccicio</p>}
      </div>
    );
  }
}

export default ExerciseSolution;
