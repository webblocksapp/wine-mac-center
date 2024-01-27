import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { ThemeProvider } from '@reactjs-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { init } from '@neutralinojs/lib';
import './main.css';

const main = () => {
  init();

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  );
};

main();
