import { SpawnProcessArgs } from '@interfaces';

export type WineAppJob = {
  name: string;
  steps: Array<{
    name: string;
    script: (args: SpawnProcessArgs) => Promise<void>;
    status: string;
    output: string;
  }>;
};
