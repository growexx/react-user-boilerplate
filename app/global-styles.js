import { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.css';
import theme, { fontFamily, lineHeights } from './styles/index';
import InjectFontFaces from './styles/injectFontFaces';
import EPILOGUE_STAMP_WOFF2 from './styles/fonts/Epilogue/Epilogue_Stamp.woff2';
import EPILOGUE_STAMP_WOFF from './styles/fonts/Epilogue/Epilogue_Stamp.woff';

const getFontURLFormat = (name, format) => `url(${name}) format(${format})`;

const GlobalStyle = createGlobalStyle`
  ${InjectFontFaces('Epilogue', [
    getFontURLFormat(EPILOGUE_STAMP_WOFF2, 'woff2'),
    getFontURLFormat(EPILOGUE_STAMP_WOFF, 'woff'),
  ])}
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: ${lineHeights.standard};
    font-family: ${fontFamily[0].fontRubik};
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: ${lineHeights.standard};
  }
  h1 : ${theme.h1}
  h2 : ${theme.h2}  
  h3 : ${theme.h3}
  h4 : ${theme.h4}
  h5 : ${theme.h5}
`;

export default GlobalStyle;
