import routesPaths from './constants/routesPaths';
import HomePage from './containers/HomePage';

const routes = [
  {
    path: routesPaths.index,
    component: HomePage,
    exact: true
  },
];

export default routes;
