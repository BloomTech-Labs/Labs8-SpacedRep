
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import dark from './styles/themes/Dark';
import App from './App';
import history from './history';
import './index.css';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const theme = {
  dark,
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
