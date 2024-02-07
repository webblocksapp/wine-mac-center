import { SpawnProcessArgs, WineAppStep } from '@interfaces';

export type WineAppJob = {
  name: string;
  steps: Array<
    WineAppStep & {
      script: (args: SpawnProcessArgs) => Promise<void>;
    }
  >;
};
