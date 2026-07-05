// styles/GlobalStyles.jsx
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * { margin:0; padding:0; box-sizing:border-box }
  body {
    font-family: 'Inter', sans-serif;
    background: #0f1117;
    color: #e2e8f0;
    display: flex;
    min-height: 100vh;
    font-size: 14px;
    line-height: 1.6;
  }
  a { text-decoration: none; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #0f1117; }
  ::-webkit-scrollbar-thumb { background: #1e2535; border-radius: 3px; }
`;