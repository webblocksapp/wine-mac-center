import { createContext, useContext, useRef } from 'react';
import { WineAppPipeline } from 'neu-wine-api';
import { createWineAppPipeline as baseCreateWineAppPipeline } from '@utils';

export interface WineAppPipelineProviderProps {
  children?: React.ReactNode;
}

export type WineAppPipelineContextType = {
  createWineAppPipeline: typeof baseCreateWineAppPipeline;
};

export const WineAppPipelineContext = createContext<WineAppPipelineContextType>(
  {} as any
);
export const useWineAppPipeline = () => useContext(WineAppPipelineContext);

export const WineAppPipelineProvider: React.FC<
  WineAppPipelineProviderProps
> = ({ children }) => {
  const store = useRef<{
    pipelines: Array<WineAppPipeline>;
  }>({ pipelines: [] });

  const createWineAppPipeline: WineAppPipelineContextType['createWineAppPipeline'] =
    async (args) => {
      const pipeline = await baseCreateWineAppPipeline(args);
      store.current.pipelines.push(pipeline);
      return pipeline;
    };

  return (
    <WineAppPipelineContext.Provider value={{ createWineAppPipeline }}>
      {children}
    </WineAppPipelineContext.Provider>
  );
};
