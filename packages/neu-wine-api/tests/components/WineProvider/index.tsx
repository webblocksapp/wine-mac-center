import { createWine } from '@utils';
import { createContext, useContext, useMemo, useState } from 'react';

export const WineContext = createContext<{
  wine: ReturnType<typeof createWine>;
  appName: string;
  setAppName: React.Dispatch<React.SetStateAction<string>>;
  engine: string;
  setEngine: React.Dispatch<React.SetStateAction<string>>;
}>({} as any);

export const useWineContext = () => useContext(WineContext);

export const WineProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [appName, setAppName] = useState('Test App');
  const [engine, setEngine] = useState('');
  const wine = useMemo(() => createWine(), []);

  return (
    <WineContext.Provider
      value={{ appName, setAppName, wine, engine, setEngine }}
    >
      {children}
    </WineContext.Provider>
  );
};
