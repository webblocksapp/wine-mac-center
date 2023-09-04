import { os } from '@neutralinojs/lib';
import { useEffect, useState } from 'react';
import { loadBashScripts } from './utils/loadBashScripts';
import { getScript } from './utils/getScript';

export const App = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const test = async () => {
    await loadBashScripts();

    let result = await os.execCommand(`${getScript('winetricks.sh')} --help`);
    setText(result.stdOut);
    setError(result.stdErr);
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
