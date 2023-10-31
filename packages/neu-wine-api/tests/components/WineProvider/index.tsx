import { createWine } from '@utils';
import { createContext, useContext, useMemo } from 'react';

export const WineContext = createContext<{
  wine: ReturnType<typeof createWine>;
}>({} as any);

export const useWineContext = () => useContext(WineContext);

export const WineProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const wine = useMemo(() => createWine(), []);

  return (
    <WineContext.Provider value={{ wine }}>{children}</WineContext.Provider>
  );
};
