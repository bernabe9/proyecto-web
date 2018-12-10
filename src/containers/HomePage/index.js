import React, { Component } from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import TextForm from '../../components/exercise/TextForm';
import SelectExerciseType from '../../components/exercise/SelectExerciseType';
import ExerciseSolution from '../../components/exercise/ExerciseSolution';
import Alert from '../../components/exercise/Alert';
import { exercisePaths } from '../../constants/constants';

const styles = () => ({
  root: {
    width: '800px',
    margin: '0 auto 25px'
  },
  button: {
    margin: '20px auto',
    display: 'block'
  }
});

class HomePage extends Component {
  static propTypes = {
    classes: object.isRequired,
    location: object.isRequired
  }

  state = {
    activeStep: 0,
    exerciseType: '',
    text: '',
    loading: false,
    success: false,
    alert: false
  };

  componentDidMount() {
    this.setSelectedText();
  }

  onModifyOption = (option) => {
    const { exercise } = this.state;
    const newOption = exercise.opciones.find(opt => opt.referencia === option.referencia);
    newOption.solucion = option.solucion;
    newOption.variantes = option.variantes;
  }

  onModifyDefinition = (solucion) => {
    const { exercise } = this.state;
    const newOption = exercise.soluciones.find(sol => sol.palabra === solucion.palabra);
    newOption.palabra = solucion.palabra;
    newOption.definicion = solucion.definicion;
  };

  onRemoveReference = (reference) => {
    const { exercise } = this.state;
    const request = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ejercicio: exercise, referencia: reference })
    };
    const url = `${process.env.API_URL}eliminar-referencia`;
    fetch(url, request)
      .then(response =>
        response.json().then((exercise) => {
          this.setState({ exercise });
        }));
  }

  setSelectedText = () => {
    const { state } = this.props.location;
    if (state) {
      this.setState({ text: state.text });
    }
  }

  goNextStep = () => {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep + 1 });
  }

  goBackStep = () => {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep - 1 });
  }

  changeExcerciseType = (exerciseType) => {
    this.setState({ exerciseType });
  }

  changeText = (text) => {
    this.setState({ text });
  }

  generateExercise = () => {
    const { text, exerciseType } = this.state;
    this.setState({ loading: true });
    const exercisePath = exercisePaths[exerciseType];
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto: text, recordar_texto: true })
    };
    const url = `${process.env.API_URL}${exercisePath}`;
    fetch(url, request)
      .then(response =>
        response.json().then((exercise) => {
          this.setState({ exercise, loading: false });
          this.goNextStep();
        }))
      .catch(() => this.setState({ loading: false }));
  }

  saveExercise = () => {
    const { exercise } = this.state;
    this.setState({ loading: true });
    const exercisePath = 'ejercicios';
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ejercicio: exercise })
    };
    const url = `${process.env.API_URL}${exercisePath}`;
    fetch(url, request)
      .then(response =>
        response.json().then(() => {
          this.setState({ alert: true, success: true, loading: false });
        }))
      .catch(() => this.setState({ alert: true, success: false, loading: false }));
  }

  render() {
    const { classes } = this.props;
    const { activeStep, text, exerciseType, loading, exercise, success, alert } = this.state;

    return (
      <div className="home-page">
        <div className={classes.root}>
          <Stepper activeStep={activeStep}>
            <Step>
              <StepLabel>Ingrese el texto</StepLabel>
            </Step>
            <Step>
              <StepLabel>Tipo de ejercicio</StepLabel>
            </Step>
            <Step>
              <StepLabel>Ejercicio generado</StepLabel>
            </Step>
          </Stepper>
        </div>
        <div className="container">
          {loading &&
            <CircularProgress />
          }
          {activeStep === 0 && !loading &&
            <div style={{ width: '100%' }}>
              <TextForm value={text} onChange={this.changeText} />
              <Button
                variant="raised"
                color="primary"
                className={classes.button}
                size="large"
                onClick={this.goNextStep}
              >
                Continuar
              </Button>
            </div>
          }
          {activeStep === 1 && !loading &&
            <div className="step-1-container">
              <SelectExerciseType
                value={exerciseType}
                onSelect={this.changeExcerciseType}
              />
              <div className="buttons-container">
                <Button
                  variant="raised"
                  color="inherit"
                  size="large"
                  onClick={this.goBackStep}
                >
                  Atrás
                </Button>
                <Button
                  variant="raised"
                  color="primary"
                  size="large"
                  onClick={this.generateExercise}
                >
                  Generar
                </Button>
              </div>
            </div>
          }
          {activeStep === 2 && !loading &&
            <div>
              <div className="buttons-container">
                <Button
                  variant="raised"
                  color="inherit"
                  size="large"
                  className={classes.button}
                  onClick={this.goBackStep}
                >
                  Atrás
                </Button>
                <Button
                  variant="raised"
                  color="primary"
                  size="large"
                  onClick={this.saveExercise}
                >
                  Guardar
                </Button>
              </div>
              <ExerciseSolution
                type={exerciseType}
                exercise={exercise}
                onRemoveReference={this.onRemoveReference}
                onModifyOption={this.onModifyOption}
                onModifyDefinition={this.onModifyDefinition}
              />
              { alert &&
                <Alert
                  message={success ? 'El ejercicio se guardó correctamente' : 'Hubo un error, vuelva a intentar más tarde'}
                  success={success}
                />
              }
            </div>
          }
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
