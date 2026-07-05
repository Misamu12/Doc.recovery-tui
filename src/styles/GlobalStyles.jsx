// styles/GlobalStyles.jsx
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * { margin:0; padding:0; box-sizing:border-box }

  :root {
    color-scheme: dark;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: #0f1117;
    color: #e2e8f0;
    min-height: 100vh;
    font-size: 14px;
    line-height: 1.6;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  a {
    text-decoration: none;
  }

  code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    background: rgba(34, 197, 94, 0.1);
    color: #86efac;
    padding: 1px 6px;
    border-radius: 4px;
    border: 1px solid rgba(34, 197, 94, 0.15);
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #0f1117; }
  ::-webkit-scrollbar-thumb { background: #1e2535; border-radius: 3px; }
`;
