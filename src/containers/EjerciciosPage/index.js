import React, { Component } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import ExercisesList from '../../containers/EjerciciosList';

class ExercisesPage extends Component {
  state = {
    loading: false,
    exercises: []
  };

  componentDidMount() {
    this.loadExercises();
  }

  loadExercises = () => {
    this.setState({ loading: true });
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const url = `${process.env.API_URL}ejercicios`;
    fetch(url, request)
      .then(response =>
        response.json().then((exercises) => {
          this.setState({ exercises, loading: false });
        }))
      .catch(() => this.setState({ loading: false }));
  }

  removeExercise = (id) => {
    const request = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    };
    const url = `${process.env.API_URL}ejercicios`;
    fetch(url, request)
      .then(response =>
        response.json().then(() => {
          const { exercises } = this.state;
          const index = exercises.findIndex(ej => ej._id == id);
          if (index > -1) {
            exercises.splice(index, 1);
          }
          this.setState({ exercises });
        }));
  }

  render() {
    const { loading, exercises } = this.state;

    if (loading) {
      return (
        <div className="loading">
          <CircularProgress />
        </div>
      );
    }

    return (
      <div className="ejercicios-page">
        {
          exercises.length > 0
            ? (
              <div>
                <h3 className="title">Ejercicios</h3>
                <ExercisesList
                  exercises={exercises}
                  onDelete={this.removeExercise}
                />
              </div>
            )
            : (
              <p>No hay ejercicios para mostrar.</p>
            )
        }
      </div>
    );
  }
}

export default ExercisesPage;
