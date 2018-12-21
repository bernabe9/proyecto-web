import React, { PureComponent } from 'react';
import { array, object, func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

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

class HiponimosSolution extends PureComponent {
  static propTypes = {
    categorias: array.isRequired,
    opciones: array.isRequired,
    classes: object.isRequired,
    onRemoveReference: func.isRequired,
  }

  render() {
    const { categorias, opciones, classes, onRemoveReference } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <div style={{ display: 'flex' }}>
            <div className="words-list">
              <Typography variant="title" className={classes.title} component="h5">
                Palabras
              </Typography>
              {opciones.map(({ palabra }, index) =>
                <Chip key={index} className={classes.chip} label={palabra} />)
              }
            </div>
            <div>
              <Typography variant="title" className={classes.title} component="h5">
                Categorias
              </Typography>
              {categorias.map((categoria, index) =>
                <Chip key={index} className={classes.chip} label={categoria} />)
              }
            </div>
          </div>
          <Divider className={classes.divider} />
          <Typography variant="title" className={classes.title} component="h5">
            Solución
          </Typography>
          {opciones.map(({ palabra, categoria }, index) =>
            <div key={index}>
              <Typography className={classes.p} component="p">
                <b>{palabra}</b>{` - ${categoria}`}
              </Typography>
              <Typography
                component="div"
                className="solution-option__delete"
                onClick={() => onRemoveReference(palabra)}
              >
                Eliminar
              </Typography>
            </div>)
          }
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(HiponimosSolution);
