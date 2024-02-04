import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@reactjs-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { useEnv } from 'neu-wine-api';
import { AppSetup } from '@components';
import { Provider } from 'react-redux';
import { store } from '@store';
import { App } from './App.tsx';
import './main.css';

const main = async () => {
  const { init } = useEnv();
  await init(process.env.NODE_ENV);

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <AppSetup>
            <App />
          </AppSetup>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

main();
