import ReactDOM from 'react-dom/client';
import { DialogFactoryProvider, ThemeProvider } from 'reactjs-ui-core';
import { BrowserRouter } from 'react-router-dom';
import {
  AppSetup,
  EnvProvider,
  NotificationsProvider,
  WineAppPipelineProvider,
} from '@components';
import { Provider } from 'react-redux';
import { store } from '@store';
import { isDev } from '@utils';
import { App } from './App.tsx';
import './main.css';

const main = async () => {
  if (isDev()) {
    const { worker } = await import('./mocks/browser');
    worker.start({ onUnhandledRequest: 'bypass' });
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
      <Provider store={store}>
        <NotificationsProvider>
          <EnvProvider>
            <WineAppPipelineProvider>
              <BrowserRouter>
                <AppSetup>
                  <DialogFactoryProvider>
                    <App />
                  </DialogFactoryProvider>
                </AppSetup>
              </BrowserRouter>
            </WineAppPipelineProvider>
          </EnvProvider>
        </NotificationsProvider>
      </Provider>
    </ThemeProvider>,
  );
};

main();
