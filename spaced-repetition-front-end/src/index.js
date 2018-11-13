import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const theme = {
  dark: {
    bodyBackground: '#43525c',
    cardBackground: '#56656f',
    sidebar: '#2c3d48',
    logo: '#48e6ae',
    TEST: 'blue',
  },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById('root'),
);
