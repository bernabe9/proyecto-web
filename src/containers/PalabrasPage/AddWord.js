import React, { Component } from 'react';
import { func } from 'prop-types';
import Button from '@material-ui/core/Button';

import Alert from '../../components/exercise/Alert';

class AddWord extends Component {
  static propTypes = {
    onAdd: func,
  }

  state = {
    showInput: false,
    inputValue: '',
    alert: false,
  }

  handleChange = (value) => {
    this.setState({ inputValue: value });
  }

  handleToggle = () => {
    this.setState({ showInput: !this.state.showInput });
  }

  handleAddWord = () => {
    const { inputValue } = this.state;
    const { onAdd } = this.props;
    onAdd(inputValue);
    this.setState({ inputValue: '', alert: true });
    setTimeout(this.alertTimeout, 5000);
  }

  alertTimeout = () => {
    this.setState({ alert: false });
  }

  render() {
    const { showInput, inputValue, alert } = this.state;

    if (showInput) {
      return (
        <div className="add-word">
          <input
            value={inputValue}
            className="input"
            onChange={({ target }) => this.handleChange(target.value)}
          />
          <Button
            variant="raised"
            color="primary"
            size="large"
            onClick={this.handleAddWord}
          >
            Agregar palabra
          </Button>
          {alert &&
            <Alert
              message="Palabra agregada correctamente"
              success
            />
          }
        </div>
      );
    }

    return (
      <div className="add-word">
        <Button
          variant="raised"
          color="primary"
          size="large"
          onClick={this.handleToggle}
        >
          + Nueva palabra
        </Button>
      </div>
    );
  }
}

export default AddWord;
