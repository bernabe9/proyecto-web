import React, { Component, Fragment } from 'react';
import { string, func } from 'prop-types';
import Button from '@material-ui/core/Button';

class Word extends Component {
  static propTypes = {
    word: string,
    onDelete: func,
  }

  state = { showDelete: false };

  handleDelete = () => {
    const { onDelete, word } = this.props;
    // eslint-disable-next-line
    const answer = confirm(`Seguro que quiere borrar la palabra "${word}"`);
    if (answer === true) {
      onDelete(word);
    }
  }

  render() {
    const { word } = this.props;
    const { showDelete } = this.state;

    return (
      <div>
        <div
          className="palabra"
          onClick={() => this.setState({ showDelete: !showDelete })}
        >
          {word}
        </div>
        {showDelete &&
          <Fragment>
            <Button
              variant="raised"
              color="primary"
              size="large"
              onClick={this.handleDelete}
            >
              Eliminar palabra
            </Button>
            <hr />
          </Fragment>
        }
      </div>
    );
  }
}

export default Word;
