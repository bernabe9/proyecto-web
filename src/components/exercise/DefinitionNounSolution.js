import React, { PureComponent } from 'react';
import { array, object, func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

import DefinitionSolution from './DefinitionSolution';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 20,
    width: '900px'
  }),
  divider: {
    margin: '12px auto'
  },
  chip: {
    fontSize: '16px',
    margin: theme.spacing.unit,
  },
  title: {
    margin: '15px 0'
  },
  p: {
    fontSize: '16px',
    margin: '15px 0'
  }
});

class DefinitionNounSolution extends PureComponent {
  static propTypes = {
    definiciones: array.isRequired,
    palabras: array.isRequired,
    soluciones: array.isRequired,
    classes: object.isRequired,
    onRemoveReference: func.isRequired,
    onModifyDefinition: func.isRequired,
  }

  render() {
    const {
      definiciones,
      palabras,
      soluciones,
      classes,
      onRemoveReference,
      onModifyDefinition,
    } = this.props;

    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <div style={{ display: 'flex' }}>
            <div className="words-list">
              <Typography variant="title" className={classes.title} component="h5">
                Palabras
              </Typography>
              {palabras.map((definicion, index) =>
                <Chip key={index} className={classes.chip} label={definicion} />)
              }
            </div>
            <div>
              <Typography variant="title" className={classes.title} component="h5">
                Definiciones
              </Typography>
              {definiciones.map((definicion, index) =>
                <Typography key={index} className={classes.p} component="p">
                  {`${index}) ${definicion}`}
                </Typography>)
              }
            </div>
          </div>
          <Divider className={classes.divider} />
          <Typography variant="title" className={classes.title} component="h5">
            Solución
          </Typography>
          {soluciones.map((solucion, index) =>
            <DefinitionSolution
              key={index}
              solucion={solucion}
              onRemove={onRemoveReference}
              onModify={onModifyDefinition}
            />)
          }
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(DefinitionNounSolution);
