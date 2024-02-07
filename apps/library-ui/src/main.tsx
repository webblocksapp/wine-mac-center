import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@reactjs-ui/core';
import { BrowserRouter } from 'react-router-dom';
import {
  AppSetup,
  EnvProvider,
  NotificationsProvider,
  WineAppPipelineProvider,
} from '@components';
import { Provider } from 'react-redux';
import { store } from '@store';
import { App } from './App.tsx';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <NotificationsProvider>
      <EnvProvider>
        <WineAppPipelineProvider>
          <BrowserRouter>
            <ThemeProvider>
              <AppSetup>
                <App />
              </AppSetup>
            </ThemeProvider>
          </BrowserRouter>
        </WineAppPipelineProvider>
      </EnvProvider>
    </NotificationsProvider>
  </Provider>
);
