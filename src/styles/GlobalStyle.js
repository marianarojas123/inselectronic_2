import { Global, css } from '@emotion/react';

const GlobalStyle = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html, body {
        min-height: 100vh;
        width: 100%;
        background-color: #000000;
        color: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 1.6;
        letter-spacing: 0.2px;
      }

      #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: #000000;
      }

      a {
        text-decoration: none;
        color: inherit;
        transition: all 0.3s ease;
      }

      button {
        cursor: pointer;
        border: none;
        outline: none;
        background: none;
        font-family: inherit;
        transition: all 0.3s ease;
      }

      input, textarea, select {
        font-family: inherit;
        transition: all 0.3s ease;
      }

      h1, h2, h3, h4, h5, h6 {
        line-height: 1.3;
        font-weight: 600;
      }

      p {
        line-height: 1.6;
        margin-bottom: 1rem;
      }

      img {
        max-width: 100%;
        height: auto;
      }

      ::-webkit-scrollbar {
        width: 10px;
      }

      ::-webkit-scrollbar-track {
        background: rgba(26, 26, 26, 0.8);
        border-radius: 5px;
      }

      ::-webkit-scrollbar-thumb {
        background: linear-gradient(45deg, #00ff88, #00b8ff);
        border-radius: 5px;
        border: 2px solid rgba(26, 26, 26, 0.8);
      }

      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(45deg, #00b8ff, #00ff88);
        box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
      }

      ::-webkit-scrollbar-corner {
        background: rgba(26, 26, 26, 0.8);
      }

      /* Selección de texto */
      ::selection {
        background: rgba(0, 255, 136, 0.3);
        color: #ffffff;
      }

      ::-moz-selection {
        background: rgba(0, 255, 136, 0.3);
        color: #ffffff;
      }

      /* Focus visible para accesibilidad */
      *:focus-visible {
        outline: 2px solid #00ff88;
        outline-offset: 2px;
      }

      /* Animaciones suaves para elementos interactivos */
      * {
        transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
      }

      /* Mejoras para dispositivos móviles */
      @media (max-width: 768px) {
        html {
          font-size: 14px;
        }
      }

      @media (max-width: 480px) {
        html {
          font-size: 13px;
        }
      }
    `}
  />
);

export default GlobalStyle; 