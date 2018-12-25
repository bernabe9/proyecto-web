import React, { Component } from 'react';
import { array, object, func } from 'prop-types';
import { format } from 'date-fns';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

import List from './List';
import ListItem from './ListItem';
import ListTitle from './ListTitle';
import ListSubTitle from './ListSubTitle';

export const formatExerciseTypes = {
  verbos: 'Verbos',
  use_of_en: 'Uso de inglés',
  sustantivos: 'Sustantivos',
  hiponimos: 'Hipónimos'
};

const styles = {
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  margin: {
    marginTop: -14,
  }
};

class ExercisesList extends Component {
  static propTypes = {
    exercises: array.isRequired,
    classes: object.isRequired,
    onDelete: func,
  }

  handleDelete = (id) => {
    const { onDelete } = this.props;
    // eslint-disable-next-line
    const answer = confirm(`Seguro que quiere borrar el ejercicio?`);
    if (answer === true) {
      onDelete(id);
    }
  }

  render() {
    const { exercises, classes } = this.props;

    return (
      <List>
        {exercises.map(({ _id, tipo, date }, index) =>
          <ListItem
            key={_id}
            button
          >
            <ListTitle>{`Ejercicio ${index + 1}`}</ListTitle>
            <div className="subtitle-contaier">
              <ListSubTitle>{formatExerciseTypes[tipo]}</ListSubTitle>
              <ListSubTitle className={classes.grow}>{date ? format(new Date(date), 'DD/MM/YYYY') : ''}</ListSubTitle>
              <IconButton aria-label="Delete" className={classes.margin} onClick={() => this.handleDelete(_id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </ListItem>)
        }
      </List>
    );
  }
}

export default withStyles(styles)(ExercisesList);
