import React, { PureComponent } from 'react';
import { string, object } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import CompleteTextSolution from './CompleteTextSolution';
import DefinitionNounSolution from './DefinitionNounSolution';

class ExerciseSolution extends PureComponent {
  static propTypes = {
    type: string.isRequired,
    exercise: object.isRequired,
  }

  render() {
    const { type, exercise } = this.props;
    const renderExercise = () => {
      if (type === 'verbos-conjugados') {
        return <CompleteTextSolution {...exercise} />;
      } else if (type === 'definicion-sustantivos') {
        return <DefinitionNounSolution {...exercise} />;
      }
      return <p>Seleccione un ejerccicio</p>;
    };

    return (
      <div>
        <Typography variant="headline" component="h3">
          Ejercicio con solución
        </Typography>
        {renderExercise()}
      </div>
    );
  }
}

export default ExerciseSolution;
