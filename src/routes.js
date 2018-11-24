import routesPaths from './constants/routesPaths';
import HomePage from './containers/HomePage';
import DefinicionesPage from './containers/DefinicionesPage';
import PalabrasPage from './containers/PalabrasPage';
import TextosPage from './containers/TextosPage';

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
  {
    path: routesPaths.palabras,
    component: PalabrasPage,
  },
  {
    path: routesPaths.textos,
    component: TextosPage,
  }
];

export default routes;
