import { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.css';
import {
  EPILOGUE_STAMP_WOFF2,
  EPILOGUE_STAMP_WOFF,
} from './styles/fonts/Epilogue';

import injectFontFaces from './styles/injectFontFaces';
const getFormattedURL = (name, format) => `url(${name}) format(${format})`;

const GlobalStyle = createGlobalStyle`
  ${injectFontFaces('Epilogue', [
    getFormattedURL(EPILOGUE_STAMP_WOFF2, 'woff2'),
    getFormattedURL(EPILOGUE_STAMP_WOFF, 'woff'),
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
  p,
  label {
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
