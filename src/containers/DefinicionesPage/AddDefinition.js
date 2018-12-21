import React, { Component } from 'react';
import { func } from 'prop-types';
import Button from '@material-ui/core/Button';

import Alert from '../../components/exercise/Alert';

class AddDefinition extends Component {
  static propTypes = {
    onAdd: func,
  }

  state = {
    showInput: false,
    inputValue: '',
    textValue: '',
    alert: false,
  }

  handleInputChange = (value) => {
    this.setState({ inputValue: value });
  }

  handleTextChange = (value) => {
    this.setState({ textValue: value });
  }

  handleToggle = () => {
    this.setState({ showInput: !this.state.showInput });
  }

  handleAddDefinition = () => {
    const { inputValue, textValue } = this.state;
    const { onAdd } = this.props;
    onAdd(inputValue, textValue);
    this.setState({ inputValue: '', textValue: '', alert: true });
    setTimeout(this.alertTimeout, 5000);
  }

  alertTimeout = () => {
    this.setState({ alert: false });
  }

  render() {
    const { showInput, inputValue, textValue, alert } = this.state;

    if (showInput) {
      return (
        <div className="add-definition">
          <Button
            variant="raised"
            color="primary"
            size="large"
            onClick={this.handleAddDefinition}
          >
            Agregar entrada
          </Button>
          <div className="input-container">
            <span>Palabra </span>
            <input
              value={inputValue}
              className="input"
              onChange={({ target }) => this.handleInputChange(target.value)}
            />
          </div>
          <div className="input-container">
            <span>Definicion </span>
            <textarea
              value={textValue}
              className="input"
              onChange={({ target }) => this.handleTextChange(target.value)}
            />
          </div>
          {alert &&
            <Alert
              message="Definición agregada correctamente"
              success
            />
          }
        </div>
      );
    }

    return (
      <div className="add-definition">
        <Button
          variant="raised"
          color="primary"
          size="large"
          onClick={this.handleToggle}
        >
          + Nueva Entrada
        </Button>
      </div>
    );
  }
}

export default AddDefinition;
