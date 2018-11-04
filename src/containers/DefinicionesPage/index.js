import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import Definicion from './Definicion';
import Filter from './Filter';

class DefinicionesPage extends Component {
  state = {
    loading: false,
    words: []
  }

  componentDidMount() {
    this.getWords();
  }

  getWords = () => {
    this.setState({ loading: true });
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const url = `${process.env.API_URL}palabras-definiciones`;
    fetch(url, request)
      .then(response =>
        response.json().then((words) => {
          this.setState({ words, loading: false });
        }))
      .catch(() => this.setState({ loading: false }));
  }

  filterWords = () => {
    const { filter, words } = this.state;
    if (!filter) {
      return words;
    }
    return words.filter(word => word.toLowerCase()[0] === filter.toLowerCase());
  }

  render() {
    const { loading } = this.state;
    const words = this.filterWords();

    if (loading) {
      return (
        <div>
          <CircularProgress />
        </div>
      );
    }

    return (
      <div className="definiciones-page">
        <h3>Diccionario</h3>
        <Filter
          onChange={filter => this.setState({ filter })}
        />
        {words.map(word => <Definicion word={word} key={word} />)}
      </div>

    );
  }
}

export default DefinicionesPage;
