import { useEffect, useState } from 'react';
import { loadBashScripts } from '@utils';
import { useWinetrickApiClient } from '@api-clients';

export const App = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const winetrickApiClient = useWinetrickApiClient();

  const test = async () => {
    await loadBashScripts();
    const winetricks = await winetrickApiClient.listApps();

    try {
      setText(JSON.stringify(winetricks, null, 2));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <pre>
      <code>
        {text} {error}
      </code>
    </pre>
  );
};
