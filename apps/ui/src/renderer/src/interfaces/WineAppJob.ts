import { WineAppStep } from '@interfaces';

export type WineAppJob = {
  name: string;
  steps: Array<WineAppStep>;
};
