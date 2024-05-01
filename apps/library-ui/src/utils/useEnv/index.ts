import { useEnv as useBaseEnv } from 'neu-wine-api';
import { createContext, useContext } from 'react';

type Env = Omit<ReturnType<typeof useBaseEnv>, 'init'>;
export const EnvContext = createContext<Env>({} as any);
export const useEnv = () => useContext(EnvContext);
