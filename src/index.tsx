import "@fontsource/syne-mono"
import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './i18n';
import { config } from './overmind';

const overmind = createOvermind(config, {
  name: 'SensingSugar',
  devtools: true,
  logProxies: true,
});

render(
  <Provider value={overmind}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector('#app')
);

if (module.hot) module.hot.accept();
