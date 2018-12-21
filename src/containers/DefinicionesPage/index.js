import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import Definicion from './Definicion';
import Filter from './Filter';
import AddDefinition from './AddDefinition';

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
          words = this.sortWords(words);
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

  sortWords = words =>
    words.sort((a, b) => {
      a = a.toLowerCase();
      b = b.toLowerCase();
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

  addDefinition = (palabra, definicion) => {
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ palabra, definicion })
    };
    const url = `${process.env.API_URL}palabras-definiciones`;
    fetch(url, request)
      .then(response =>
        response.json().then(() => {
          let { words } = this.state;
          words = this.sortWords(words.concat(palabra));
          this.setState({ words, loading: false });
        }))
      .catch(() => this.setState({ loading: false }));
  }

  removeDefinition = (palabra) => {
    const request = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ palabra })
    };
    const url = `${process.env.API_URL}palabras-definiciones`;
    fetch(url, request)
      .then(response =>
        response.json().then(() => {
          const { words } = this.state;
          const index = words.indexOf(palabra);
          if (index > -1) {
            words.splice(index, 1);
          }
          this.setState({ words, loading: false });
        }));
  }

  render() {
    const { loading } = this.state;
    const words = this.filterWords();

    if (loading) {
      return (
        <div className="loading">
          <CircularProgress />
        </div>
      );
    }

    return (
      <div className="definiciones-page">
        <h3>Diccionario</h3>
        <AddDefinition onAdd={this.addDefinition} />
        <Filter
          onChange={filter => this.setState({ filter })}
        />
        {words.map(word =>
          <Definicion
            word={word}
            key={word}
            onDelete={this.removeDefinition}
          />)}
      </div>

    );
  }
}

export default DefinicionesPage;
