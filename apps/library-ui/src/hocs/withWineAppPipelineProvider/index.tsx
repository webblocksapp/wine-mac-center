import { createContext, useContext, useRef } from 'react';
import { WineAppPipeline } from 'neu-wine-api';
import { createWineAppPipeline as baseCreateWineAppPipeline } from '@utils';

export type WineAppPipelineContextType = {
  createWineAppPipeline: typeof baseCreateWineAppPipeline;
  findWineAppPipeline: (id: string | undefined) => WineAppPipeline | undefined;
  killWineAppPipeline: (id: string | undefined) => void;
};

export const WineAppPipelineContext = createContext<WineAppPipelineContextType>(
  {} as any,
);
export const useWineAppPipeline = () => useContext(WineAppPipelineContext);

export const withWineAppPipelineProvider = <T,>(Component: React.FC<T>) => {
  return (props: T & JSX.IntrinsicAttributes) => {
    const store = useRef<{
      pipelines: Array<WineAppPipeline>;
    }>({ pipelines: [] });

    const createWineAppPipeline: WineAppPipelineContextType['createWineAppPipeline'] =
      async (args) => {
        const pipeline = await baseCreateWineAppPipeline(args);
        store.current.pipelines.push(pipeline);
        return pipeline;
      };

    const findWineAppPipeline = (id: string | undefined) =>
      store.current.pipelines.find((item) => item.id === id);

    const killWineAppPipeline = (id: string | undefined) => {
      const foundPipeline = findWineAppPipeline(id);
      foundPipeline?.kill();
    };

    return (
      <WineAppPipelineContext.Provider
        value={{
          createWineAppPipeline,
          findWineAppPipeline,
          killWineAppPipeline,
        }}
      >
        <Component {...props} />
      </WineAppPipelineContext.Provider>
    );
  };
};