import { createEnv } from '@utils/createEnv';
import { useEffect } from 'react';

export const App: React.FC = () => {
  useEffect(() => {
    const env = createEnv();
    env.init().then(() => {
      console.log(env.get());
    });
  }, []);

  return <>Hello World</>;
};

export default App;
