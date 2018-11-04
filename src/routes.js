import routesPaths from './constants/routesPaths';
import HomePage from './containers/HomePage';
import DefinicionesPage from './containers/DefinicionesPage';

const routes = [
  {
    path: routesPaths.index,
    component: HomePage,
    exact: true
  },
  {
    path: routesPaths.definiciones,
    component: DefinicionesPage,
  },
];

export default routes;
