import React, { Component } from 'react';
import { object } from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import format from 'date-fns/format';

class TextosPage extends Component {
  static propTypes = {
    history: object.isRequired,
  }

  state = {
    loading: false,
    textos: []
  }

  componentDidMount() {
    this.getTexts();
  }

  onUseText = (text) => {
    const { history } = this.props;
    history.push('/', { text });
  }

  getTexts = () => {
    this.setState({ loading: true });
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const url = `${process.env.API_URL}textos`;
    fetch(url, request)
      .then(response =>
        response.json().then((textos) => {
          this.setState({ textos, loading: false });
        }))
      .catch(() => this.setState({ loading: false }));
  }

  render() {
    const { loading, textos } = this.state;

    if (loading) {
      return (
        <div className="loading">
          <CircularProgress />
        </div>
      );
    }

    return (
      <div className="textos-page">
        <h3>Textos</h3>
        {textos.map(({ id, date, texto }) =>
          <div key={id} className="textos-page__text-container">
            <div className="textos-page__text-header">
              <p>{format(date, 'DD/MM/YYYY HH:mm')}</p>
              <Button
                variant="raised"
                color="primary"
                size="large"
                onClick={() => this.onUseText(texto)}
              >
                Usar
              </Button>
            </div>
            <p>{texto}</p>
          </div>)}
      </div>

    );
  }
}

export default TextosPage;
