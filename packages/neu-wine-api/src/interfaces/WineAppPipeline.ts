import {
  SpawnProcessArgs,
  UpdateProcess,
  WineAppJobWithScript,
  WineAppPipelineStatus,
  WineAppStep,
} from '@interfaces';

export type WineAppPipeline = {
  _: {
    onUpdate?: (status: WineAppPipelineStatus) => void;
    std: (
      action: 'stdOut' | 'stdErr' | 'exit',
      step: WineAppStep & {
        script: (args: SpawnProcessArgs) => Promise<void>;
      },
      data: string | number,
      updateProcess?: UpdateProcess
    ) => void;
  };
  id: string;
  onUpdate: (fn: (status: WineAppPipelineStatus) => void) => void;
  jobs: WineAppJobWithScript[];
  run: () => void;
  kill: () => void;
};
