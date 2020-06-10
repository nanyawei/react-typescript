import React from 'react';
import ReactDom from 'react-dom';

import App from './App';

const ROOT = document.getElementById('root');

ReactDom.render(
  <App />,
  ROOT
);

if (module.hot) {
  module.hot.accept('./App.tsx', () => {
    const nextApp = require('./App.tsx').default;
    ReactDom.render(nextApp, ROOT);
  });
}