import React, { Component } from 'react';
import { object, func } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  p: {
    fontSize: '16px',
    margin: '15px 0'
  }
});

class DefinitionSolution extends Component {
  static propTypes = {
    solucion: object.isRequired,
    onModify: func.isRequired,
    onRemove: func.isRequired,
    classes: object.isRequired,
  }

  state = {
    modifying: false,
    solucion: this.props.solucion,
  }

  onChange = (value) => {
    const { solucion } = this.state;
    const newSolucion = {
      ...solucion,
      definicion: value
    };
    this.setState({ solucion: newSolucion });
  }

  onCancel = () => {
    const { solucion } = this.props;
    this.setState({
      solucion,
      modifying: false
    });
  }

  onModify = () => {
    const { solucion } = this.state;
    const { onModify } = this.props;
    onModify(solucion);
    this.setState({ modifying: false });
  }

  renderDefinition = () => {
    const { classes } = this.props;
    const { solucion, modifying } = this.state;
    if (modifying) {
      return (
        <div>
          <Typography className={classes.p} component="p">
            <b style={{ textTransform: 'capitalize' }}>{solucion.palabra}</b>:
          </Typography>
          <textarea
            value={solucion.definicion}
            className="definicion-text-area"
            onChange={e => this.onChange(e.target.value)}
          />
        </div>
      );
    }
    return (
      <Typography className={classes.p} component="p">
        <b style={{ textTransform: 'capitalize' }}>{solucion.palabra}</b>: {solucion.definicion}
      </Typography>
    );
  }

  render() {
    const { onRemove } = this.props;
    const { modifying, solucion } = this.state;

    return (
      <div>
        {this.renderDefinition()}
        <div>
          {!modifying &&
            <Typography
              component="div"
              className="solution-option__delete"
              onClick={() => onRemove(solucion.palabra)}
            >
              Eliminar
            </Typography>
          }
          {!modifying &&
            <Typography
              component="div"
              className="solution-option__delete"
              onClick={() => this.setState({ modifying: true })}
            >
              Modificar
            </Typography>
          }
          {modifying &&
            <Typography
              component="div"
              className="solution-option__delete"
              onClick={this.onCancel}
            >
              Cancelar
            </Typography>
          }
          {modifying &&
            <Typography
              component="div"
              className="solution-option__delete"
              onClick={this.onModify}
            >
              Guardar
            </Typography>
          }
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DefinitionSolution);
