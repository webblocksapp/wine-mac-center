import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './main.css';
import { useEnv } from 'neu-wine-api';
import { WineProvider } from '@@components';

const main = async () => {
  const env = useEnv();
  await env.init();

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <WineProvider>
        <App />
      </WineProvider>
    </BrowserRouter>
  );
};

main();
