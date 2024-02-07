import { createContext, useContext } from 'react';
import { createWineAppPipeline as baseCreateWineAppPipeline } from 'neu-wine-api';
import { WineAppConfig } from '@interfaces';

export interface WineAppPipelineProviderProps {
  children?: React.ReactNode;
}

export const WineAppPipelineContext = createContext<{
  runWineAppPipeline: (appConfig: WineAppConfig) => Promise<void>;
} | null>(null);
export const useWineAppPipeline = () => useContext(WineAppPipelineContext);

export const WineAppPipelineProvider: React.FC<
  WineAppPipelineProviderProps
> = ({ children }) => {
  const runWineAppPipeline = async (appConfig: WineAppConfig) => {
    const pipeline = await baseCreateWineAppPipeline({ appConfig });
    pipeline.onUpdate((currentJobs) => {
      console.log(currentJobs);
    });
  };

  return (
    <WineAppPipelineContext.Provider value={{ runWineAppPipeline }}>
      {children}
    </WineAppPipelineContext.Provider>
  );
};
