import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@reactjs-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { useEnv } from 'neu-wine-api';
import { AppSetup } from '@components';
import { App } from './App.tsx';
import './main.css';

const main = async () => {
  const { init } = useEnv();
  await init();

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <ThemeProvider>
        <AppSetup>
          <App />
        </AppSetup>
      </ThemeProvider>
    </BrowserRouter>
  );
};

main();
