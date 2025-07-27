import { Global, css } from '@emotion/react';

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    min-height: 100vh;
    background-color: #000000;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #ffffff;
    line-height: 1.5;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  main {
    flex: 1;
    padding-top: 80px;
    position: relative;
    z-index: 1;
    background-color: #000000;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  /* Estilos para la barra de desplazamiento */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #1a1a1a;
  }

  ::-webkit-scrollbar-thumb {
    background: #00ff88;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #00cc6a;
  }

  /* Asegurar que el contenido sea visible */
  .content-wrapper {
    position: relative;
    z-index: 2;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 2rem;
    margin: 2rem auto;
    max-width: 1200px;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.1);
  }

  h1, h2, h3, h4, h5, h6 {
    color: #ffffff;
    margin-bottom: 1rem;
  }

  p {
    color: #ffffff;
    margin-bottom: 1rem;
  }
`;

const GlobalStyle = () => <Global styles={globalStyles} />;

export default GlobalStyle; 