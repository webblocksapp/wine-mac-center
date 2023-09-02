import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { ThemeProvider } from '@reactjs-ui/core';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
