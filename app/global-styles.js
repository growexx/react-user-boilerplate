import { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.css';
import theme, { fontFamily, lineHeights } from './styles/index';
const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: ${lineHeights.standard};
    font-family: ${fontFamily.fontRubik}
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
