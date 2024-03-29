import React from 'react';
import express from 'express';
import compress from 'compression';
import Helmet from 'react-helmet';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';

import App from './_app';
import routes from '../src/routes';
import Doc from './_document';
import configureStore from '../src/store/configureStore.prod';
import { applyQueryParams } from '../src/utils/helpers';
import routesPaths from '../src/constants/routesPaths';

const assets = require('./build/assets.json'); // eslint-disable-line import/no-unresolved

const server = express();

const cacheTime = 31536000;

server
  .disable('x-powered-by')
  .use(compress())
  .use(express.static('server/build/public', { maxAge: cacheTime }))
  .get('*', async (req, res) => {
    try {
      const store = configureStore();
      const context = {};

      // Fetch data promises
      const promises = matchRoutes(routes, req.path)
        .map(({ route }) => (route.component.loadData ? route.component.loadData(store) : null))
        .map((promise) => {
          if (promise) {
            return new Promise((resolve) => {
              promise.then(resolve).catch(resolve);
            });
          }
        });

      Promise.all(promises).then(async () => {
        const renderPage = () => {
          const staticRouter = (
            <Provider store={store}>
              <StaticRouter location={req.url} context={context}>
                <App routes={routes} />
              </StaticRouter>
            </Provider>
          );
          const html = ReactDOMServer.renderToString(staticRouter);
          const helmet = Helmet.renderStatic();
          const preloadedState = serialize(store.getState().toJS());
          return { html, helmet, preloadedState };
        };

        const { html, helmet, preloadedState } = renderPage();

        // Redirect
        if (context.url) {
          let queryRedirect;
          if (req.url !== routesPaths.index) {
            queryRedirect = { from: req.url };
          }
          res.writeHead(302, {
            Location: applyQueryParams(context.url, queryRedirect)
          });
          res.end();
        } else {
          if (context.status) {
            res.status(context.status);
          }
          const docProps = { helmet, assets, preloadedState };
          const doc = ReactDOMServer.renderToStaticMarkup(<Doc {...docProps} />);
          res.send(`<!doctype html> ${doc.replace('SSR_MARKUP', html)}`);
        }
      });
    } catch (error) {
      res.json(error);
    }
  });

export default server;
