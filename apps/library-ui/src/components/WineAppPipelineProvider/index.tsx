import { createContext, useContext, useRef } from 'react';
import {
  WineAppConfig,
  WineAppPipeline,
  createWineAppPipeline as baseCreateWineAppPipeline,
} from 'neu-wine-api';

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
    pipelines: Array<WineAppPipeline>;
  }>({ pipelines: [] });

  const createWineAppPipeline = async (appConfig: WineAppConfig) => {
    const pipeline = await baseCreateWineAppPipeline({ appConfig });
    store.current.pipelines.push(pipeline);
    return pipeline;
  };

  return (
    <WineAppPipelineContext.Provider value={{ createWineAppPipeline }}>
      {children}
    </WineAppPipelineContext.Provider>
  );
};
