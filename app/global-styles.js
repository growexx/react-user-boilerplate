import { createGlobalStyle } from 'styled-components';
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
  /*
  * margin utility class
  */
  .u-m-1{
    margin: @margin-xss;
  }
  .u-m-2{
    margin: @margin-xs;
  }
  .u-m-3{
    margin: @margin-sm;
  }
  .u-m-4{
    margin: @margin-md;
  }
  .u-m-5{
    margin: @margin-lg;
  }

  /**
   * display utility class
  */
   .u-d-block{
    display: block;
  }
  .u-d-flex{
    display: flex;
  }
  .u-d-inline{
    display: inline;
  }
  .u-d-inline-block{
    display: inline-block;
  }
  .u-d-inline-flex{
    display: inline-flex;
  }
  .u-d-none{
    display: none;
  }
  .u-d-table{
    display: table;
  }
  .u-d-table-cell{
    display: table-cell;
  }

  /**
   * Utility classes for flex-box 
  */
  .u-flex-column {
    flex-direction: column;
  }
`;

export default GlobalStyle;
