# App CSS Style Guide

SpacedReps uses Styled Components for CSS styling. The documentation can be found [here](https://www.styled-components.com/docs/).

## Theming

*index.js - Where theming is injected into the app*
```
import { ThemeProvider } from 'styled-components';
import dark from './styles/themes/Dark';

const theme = {
  dark,
};
```
*/styles/themes/{theme-name} - Individual theme js files*
```
const dark = {
  bodyBackground: '#43525c',
  cardBackground: '#56656f',
  main: '#2c3d48', // main background color
  logo: '#48e6ae',
};

export default dark;
```

### Simplified Guide for Creating Additional Themes
1. Create a new file in `/styles/themes` and give it a descriptive name.
2. Copy and paste the dark theme's contents into the new theme file.
4. Import the new theme into `index.js` and add in the theme object.
3. Start creating!
4. If you find you need to add a new property to the theming template, add that property to the old themes as well, and style them accordingly to their design schemes. This is to keep consistency and a standard across all themes.
5. Comment any property names that may come across unclear. For instance, in our dark theme above, the *main* property is commented because it is too vague.
6. Save and test!
7. Make a PR using our PR template.

## Global Styles
All global styles are located within the `styles` directory. In `'/styles/index.js'`, the order of exported files is important. Reset and Global should always be first.

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