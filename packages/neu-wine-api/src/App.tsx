import { os } from '@neutralinojs/lib';
import { useEffect, useState } from 'react';
import { loadBashScripts } from './utils/loadBashScripts';

export const App = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const test = async () => {
    await loadBashScripts();

    let result = await os.execCommand(`${NL_CWD}/src/bash/hello.sh 22`);
    setText(result.stdOut);
    setError(result.stdErr);
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <>
      Hello World {text} {error}
    </>
  );
};
