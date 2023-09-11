import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './main.css';
import { useEnv } from 'neu-wine-api';

const main = async () => {
  const env = useEnv();
  await env.init();

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

main();
