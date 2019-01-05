import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBarMaterial from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  flex: {
    flex: 1,
  },
};

function AppBar(props) {
  const { classes } = props;
  return (
    <AppBarMaterial position="static" color="default">
      <Toolbar>
        <Typography variant="title" color="inherit" className={classes.flex}>
          Proyecto 2018
        </Typography>
        <Link to="/" className="navbar-link">
          <Button color="inherit">
            Inicio
          </Button>
        </Link>
        <Link to="/textos" className="navbar-link">
          <Button color="inherit">
            Textos
          </Button>
        </Link>
        <Link to="/definiciones" className="navbar-link">
          <Button color="inherit">
            Diccionario
          </Button>
        </Link>
        <Link to="/palabras" className="navbar-link">
          <Button color="inherit">
            Palabras
          </Button>
        </Link>
        <Link to="/ejercicios" className="navbar-link">
          <Button color="inherit">
            Ejercicios
          </Button>
        </Link>
      </Toolbar>
    </AppBarMaterial>
  );
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBar);
