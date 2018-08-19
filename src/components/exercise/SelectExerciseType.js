import React, { PureComponent } from 'react';
import { string, func, object } from 'prop-types';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { exerciseTypes } from '../../constants/constants';

const styles = () => ({
  root: {
    marginBottom: '90px',
    width: '250px'
  }
});

class SelectExerciseType extends PureComponent {
  static propTypes = {
    value: string.isRequired,
    onSelect: func.isRequired,
    classes: object.isRequired,
  }

  render() {
    const { value, onSelect, classes } = this.props;

    return (
      <FormControl className={classes.root}>
        <InputLabel htmlFor="exercise-input">Tipo de ejercicio</InputLabel>
        <Select
          value={value}
          onChange={e => onSelect(e.target.value)}
          inputProps={{
            name: 'exercise',
            id: 'exercise-input'
          }}
        >
          <MenuItem value={exerciseTypes.verbosConjugados}>
            Verbos conjugados
          </MenuItem>
          <MenuItem value={exerciseTypes.definicionSustantivos}>
            Definición sustantivos
          </MenuItem>
          <MenuItem value={exerciseTypes.useOfEn}>
            Use of English
          </MenuItem>
        </Select>
      </FormControl>
    );
  }
}

export default withStyles(styles)(SelectExerciseType);
