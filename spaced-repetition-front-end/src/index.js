
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import App from './App';
import history from './history';
import './index.css';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const theme = {
  dark: {
    bodyBackground: '#43525c',
    cardBackground: '#56656f',
    sidebar: '#2c3d48',
    logo: '#48e6ae',
  },
  buttons: {
    base: `
      font-size: 16px;
      padding: 3px 20px 3px 20px;
      margin: 0px;
      color: rgba(255,255,255, .8);
      background: #42BAAC;
      border: 1px solid #707070;
      border-radius: 6px;
    `,
    positive: '#42BAAC',
    negative: '#EA7075',
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
