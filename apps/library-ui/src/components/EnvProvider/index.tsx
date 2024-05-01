import { useEnv as useBaseEnv } from 'neu-wine-api';
import { EnvContext } from '@utils';
import { useEffect, useState } from 'react';

export interface EnvProviderProps {
  children?: React.ReactNode;
}

export const EnvProvider: React.FC<EnvProviderProps> = ({ children }) => {
  const [initializing, setInitializing] = useState(true);

  const { init, ...env } = useBaseEnv();

  useEffect(() => {
    (async () => {
      setInitializing(true);
      await init(process.env.NODE_ENV);
      setInitializing(false);
    })();
  }, []);

  return (
    <EnvContext.Provider value={env}>
      {initializing ? 'Initializing...' : children}
    </EnvContext.Provider>
  );
};
