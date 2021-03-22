// import React from 'react';
// import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
// import { THEMES } from '../constants';

// import { checkSupportedTheme, getQueryParam } from '../utils';

// import { useDarkModeManager } from '../contexts/LocalStorage';

// export default function ThemeProvider({ children }) {
//   const [darkMode] = useDarkModeManager();
//   const themeURL = checkSupportedTheme(getQueryParam(window.location, 'theme'));
//   const themeToRender = themeURL
//     ? themeURL.toUpperCase() === THEMES.DARK
//       ? true
//       : themeURL.toUpperCase() === THEMES.LIGHT
//       ? false
//       : darkMode
//     : darkMode;
//   return (
//     <StyledComponentsThemeProvider theme={themeConfig(themeToRender)}>
//       {children}
//     </StyledComponentsThemeProvider>
//   );
// }

// const theme = require(`sass-extract-loader?{
//   "plugins": ["sass-extract-js"]
// }!../../src/styles/otterwaiver.scss`);

// const themeConfig = darkMode => ({
//   ...theme,
// });
