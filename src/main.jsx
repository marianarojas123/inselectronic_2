import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Configuración básica del documento
document.documentElement.style.margin = '0';
document.documentElement.style.padding = '0';
document.documentElement.style.minHeight = '100vh';
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.minHeight = '100vh';
document.body.style.overflowX = 'hidden';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
