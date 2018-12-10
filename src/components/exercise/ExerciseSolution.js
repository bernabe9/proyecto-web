import React, { PureComponent } from 'react';
import { string, object, func } from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { exerciseComponents } from '../../constants/constants';

class ExerciseSolution extends PureComponent {
  static propTypes = {
    type: string.isRequired,
    exercise: object.isRequired,
    onRemoveReference: func.isRequired,
    onModifyOption: func.isRequired,
    onModifyDefinition: func.isRequired,
  }

  render() {
    const { type, exercise, onRemoveReference, onModifyOption, onModifyDefinition } = this.props;
    const Component = exerciseComponents[type];

    return (
      <div>
        <Typography variant="headline" component="h3">
          Ejercicio con solución
        </Typography>
        {Component ?
          <Component
            {...exercise}
            onRemoveReference={onRemoveReference}
            onModifyOption={onModifyOption}
            onModifyDefinition={onModifyDefinition}
          /> :
          <p>Seleccione un ejerccicio</p>}
      </div>
    );
  }
}

export default ExerciseSolution;
