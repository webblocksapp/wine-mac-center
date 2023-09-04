import { useEffect, useState } from 'react';
import { loadBashScripts } from '@utils';
import { useWinetrickApiClient } from '@api-clients';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';

export const App = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const winetrickApiClient = useWinetrickApiClient();

  const test = async () => {
    await loadBashScripts();
    // const winetricks = await winetrickApiClient.listApps();

    try {
      setText(await winetrickApiClient.help());
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    test();
  }, []);

  return useRoutes(routes);
};
