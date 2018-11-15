import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import App from './App';
import history from './history';
import './index.css';

const theme = {
  dark: {
    bodyBackground: '#43525c',
    cardBackground: '#56656f',
    sidebar: '#2c3d48',
    logo: '#48e6ae',
    TEST: 'blue',
  },
};

/**
 * The history prop on Router provides the Auth module a means of redirection.
 * The Auth component does not recieve props.
 *
 * Router is used instead of BrowserRouter since it will not use the history prop.
 */
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router history={history}>
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById('root'),
);
