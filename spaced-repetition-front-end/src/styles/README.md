# App CSS Style Guide

SpacedReps uses Styled Components for CSS styling. The documentation can be found [here](https://www.styled-components.com/docs/).

All global styles are located within the `styles` directory. In `'/styles/index.js'`, The order of exported files is important. Reset and Global should always be first.

In `'/src/index.js'`, our theme is created:
```
import { ThemeProvider } from 'styled-components';

const theme = {
  dark: {
    bodyBackground: '#43525c',
    cardBackground: '#56656f',
    main: '#2c3d48', // main background
    logo: '#48e6ae',
  },
};
```

In `'/src/App.js'`, the global styles are injected by this code:
```
import styled, { createGlobalStyle } from 'styled-components';
import styles from './styles';

const GlobalStyle = createGlobalStyle`
  body {
    background: ${props => props.theme.dark.main};
  }
  ${styles}
`;
```

An example of how to use the props from global styles can be seen in the code snippet above.
```
background: ${props => props.theme.dark.main};
```