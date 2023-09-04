import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { init } from '@neutralinojs/lib';
import './main.css';
import { useEnv } from '@utils';

const main = async () => {
  const env = useEnv();

  await env.init();

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  init();
};

main();
