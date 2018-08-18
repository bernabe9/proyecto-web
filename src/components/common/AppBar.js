import React from 'react';
import AppBarMaterial from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const AppBar = () => (
  <AppBarMaterial position="static" color="default">
    <Toolbar>
      <Typography variant="title" color="inherit">
        Proyecto 2018
      </Typography>
    </Toolbar>
  </AppBarMaterial>
);

export default AppBar;
