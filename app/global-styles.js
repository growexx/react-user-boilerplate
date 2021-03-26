import { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.css';
import {
  ROBOTO_BLACK_TTF,
  ROBOTO_BOLD_ITALIC_TTF,
} from './styles/fonts/Roboto';

import injectFontFaces from './styles/injectFontFaces';
const getFormattedURL = (name, format) => `url(${name}) format(${format})`;

const GlobalStyle = createGlobalStyle`
  ${injectFontFaces('Roboto', [
    getFormattedURL(ROBOTO_BLACK_TTF, 'ttf'),
    getFormattedURL(ROBOTO_BOLD_ITALIC_TTF, 'ttf'),
  ])}
  body {
    height: 100%;
    width: 100%;
  }
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }
`;

export default GlobalStyle;
