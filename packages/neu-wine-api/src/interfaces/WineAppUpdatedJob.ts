import { WineAppStep } from '@interfaces';

export type WineAppUpdatedJob = {
  name: string;
  steps: Array<WineAppStep>;
};
