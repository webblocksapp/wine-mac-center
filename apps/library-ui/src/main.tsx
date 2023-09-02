import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { ThemeProvider } from '@reactjs-ui/core';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
