import React, { PureComponent } from 'react';
import { string, array, object, func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Highlighter from 'react-highlight-words';

import TextSolutionOption from './TextSolutionOption';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 20,
    whiteSpace: 'pre-line'
  })
});

class CompleteTextSolution extends PureComponent {
  static propTypes = {
    texto: string.isRequired,
    opciones: array.isRequired,
    classes: object.isRequired,
    onRemoveReference: func.isRequired,
    onModifyOption: func.isRequired
  }

  render() {
    const { texto, opciones, classes, onRemoveReference, onModifyOption } = this.props;

    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography component="p">
            <Highlighter
              highlightStyle={{ color: '#a9a6a6', backgroundColor: 'white' }}
              searchWords={['(present)', '(past)']}
              textToHighlight={texto}
              autoEscape
            />
          </Typography>
        </Paper>
        <Paper className={classes.root} elevation={4}>
          {opciones.map((option, index) =>
            <TextSolutionOption
              key={`${index}-${option.solucion}`}
              option={option}
              onDelete={() => onRemoveReference(option.referencia)}
              onModify={onModifyOption}
            />)
          }
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(CompleteTextSolution);
