import './scss/index.scss';

import app from './app/app';

window.onload = app;

if (module.hot) {
  // See: http://andrewhfarmer.com/webpack-hmr-tutorial/
  // See: https://survivejs.com/webpack/appendices/hmr/
  // See: https://medium.com/@baphemot/react-hot-module-reload-f6b3d34b9b86
  // See: https://webpack.js.org/guides/hmr-react/

  // This tells Webpack that this file and all of its dependencies can be replaced.
  // Normally you should not need this
  //module.hot.accept();

  // Any changes to our App will cause a hotload re-render.
  module.hot.accept('./app/app', () => {
    const next = require('./app/app').default;
    next();
  });
}
