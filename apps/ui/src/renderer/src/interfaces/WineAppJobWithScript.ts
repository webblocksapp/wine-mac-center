import { SpawnProcessArgs, WineAppStep } from '@interfaces';

export type WineAppJobWithScript = {
  name: string;
  steps: Array<
    WineAppStep & { script: (args: SpawnProcessArgs) => Promise<void> }
  >;
};
