import { createContext, useContext, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import {
  WineAppPipeline,
  createWineAppPipeline as baseCreateWineAppPipeline,
} from 'neu-wine-api';
import { WineAppConfig } from '@interfaces';

export interface WineAppPipelineProviderProps {
  children?: React.ReactNode;
}

export const WineAppPipelineContext = createContext<{
  createWineAppPipeline: (
    appConfig: WineAppConfig
  ) => Promise<WineAppPipeline & { id: string }>;
}>({} as any);
export const useWineAppPipeline = () => useContext(WineAppPipelineContext);

export const WineAppPipelineProvider: React.FC<
  WineAppPipelineProviderProps
> = ({ children }) => {
  const store = useRef<{
    pipelines: Array<{ id: string; content: WineAppPipeline }>;
  }>({ pipelines: [] });

  const createWineAppPipeline = async (appConfig: WineAppConfig) => {
    const pipeline = await baseCreateWineAppPipeline({ appConfig });
    const id = uuid();
    store.current.pipelines.push({ id, content: pipeline });
    return { id, ...pipeline };
  };

  return (
    <WineAppPipelineContext.Provider value={{ createWineAppPipeline }}>
      {children}
    </WineAppPipelineContext.Provider>
  );
};
