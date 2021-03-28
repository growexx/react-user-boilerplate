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
  .u-m-4{
    margin: @margin-xss;
  }
  .u-m-8{
    margin: @margin-xs;
  }
  .u-m-12{
    margin: @margin-sm;
  }
  .u-m-16{
    margin: @margin-md;
  }
  .u-m-24{
    margin: @margin-lg;
  }
  .ant-layout-sider{
    background: @error-color !important;
   }
`;

export default GlobalStyle;
