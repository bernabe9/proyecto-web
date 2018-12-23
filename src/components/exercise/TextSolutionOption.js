import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = () => ({
  divider: { margin: '12px auto' }
});

class TextSolutionOption extends Component {
  state = {
    modifying: false,
    option: this.props.option,
  }

  onChangeVariation = (value, isSolution, index) => {
    const { option } = this.state;
    const newOption = {
      ...option,
      variantes: [...option.variantes]
    };
    newOption.variantes[index] = value;
    if (isSolution) {
      newOption.solucion = value;
    }
    this.setState({ option: newOption });
  }

  onCancel = () => {
    const { option } = this.props;
    this.setState({
      option,
      modifying: false
    });
  }

  onModify = () => {
    const { option } = this.state;
    const { onModify } = this.props;
    onModify(option);
    this.setState({ modifying: false });
  }

  renderVariante = (variante) => {
    const { option } = this.state;
    return variante === option.solucion ? <mark>{variante}</mark> : variante;
  }

  renderOptions = () => {
    const { option } = this.state;
    if (this.state.modifying) {
      return (
        <Typography style={{ whiteSpace: 'pre-line' }} component="div">
          <p>{option.referencia}</p>
          {option.variantes.map((variante, index) =>
            <input
              key={index}
              className={variante === option.solucion ? 'variante-input variante-input--solution' : 'variante-input'}
              onChange={e => this.onChangeVariation(e.target.value, variante === option.solucion, index)}
              value={variante}
            />)
          }
        </Typography>
      );
    }
    return (
      <Typography style={{ whiteSpace: 'pre-line' }} component="div">
        <p>{option.referencia}</p>
        {option.variantes.map(variante =>
          <p key={variante}>{this.renderVariante(variante)}</p>)
        }
      </Typography>
    );
  }

  render() {
    const { modifying } = this.state;
    const { classes, onDelete } = this.props;

    return (
      <div>
        <div className="solution-option">
          {this.renderOptions()}
          <div>
            {!modifying &&
              <Typography
                component="div"
                className="solution-option__delete"
                onClick={onDelete}
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
        <Divider className={classes.divider} />
      </div>
    );
  }
}

TextSolutionOption.propTypes = {
  option: object.isRequired,
  classes: object.isRequired,
  onModify: func.isRequired,
  onDelete: func.isRequired,
};

export default withStyles(styles)(TextSolutionOption);
