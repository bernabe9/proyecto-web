import React, { Component } from 'react';
import { string } from 'prop-types';

class Definicion extends Component {
  static propTypes = {
    word: string,
  }

  state = {
    loading: false,
    showDefinition: false
  }

  loadDefinition = () => {
    const { word } = this.props;
    this.setState({ loading: true });
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const url = `${process.env.API_URL}definiciones/${word}`;
    fetch(url, request)
      .then(response =>
        response.json().then(({ definiciones }) => {
          this.setState({
            definitions: definiciones,
            showDefinition: true,
            loading: false
          });
        }))
      .catch(() => this.setState({ loading: false }));
  }

  toggleDefinition = () => {
    const { showDefinition, definitions } = this.state;
    if (!showDefinition && !definitions) {
      this.loadDefinition();
    } else if (!showDefinition && definitions) {
      this.setState({ showDefinition: true });
    } else {
      this.setState({ showDefinition: false });
    }
  }

  render() {
    const { word } = this.props;
    const { loading, showDefinition, definitions } = this.state;

    return (
      <div>
        <div
          className="palabra"
          onClick={this.toggleDefinition}
        >
          {word}
        </div>
        {loading && <p>Cargando...</p>}
        {showDefinition &&
          <div>
            <hr />
            {definitions.map(({ definicion, ejemplo, tipo, traducciones }, index) =>
              <div key={index}>
                <p>{`${index + 1})`}</p>
                <p><strong>Definicion:</strong> {definicion}</p>
                {ejemplo &&
                  <p><strong>Ejemplo:</strong> {ejemplo}</p>
                }
                {tipo &&
                  <p><strong>Tipo:</strong> {tipo}</p>
                }
                {traducciones &&
                  <p><strong>Traducciones:</strong> {traducciones.join(', ')}</p>
                }
              </div>)}
            <hr />
          </div>
        }
      </div>
    );
  }
}

export default Definicion;
