import React, { Fragment, PureComponent } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import history from '../utils/history';
import RouteFromPath from './routes/RouteFromPath';
import AppBar from './common/AppBar';
import routes from '../routes';

class App extends PureComponent {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Proyecto Ingles - Docentes</title>
        </Helmet>
        <ConnectedRouter history={history}>
          <Fragment>
            <AppBar />
            <Switch>
              {routes.map((route, index) =>
                <RouteFromPath
                  key={`route${index}`}
                  {...route}
                />)
              }
            </Switch>
          </Fragment>
        </ConnectedRouter>
      </Fragment>
    );
  }
}

export default App;
