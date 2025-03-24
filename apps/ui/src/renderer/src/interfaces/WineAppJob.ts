import { WineAppStep } from '@interfaces/WineAppStep';

export type WineAppJob = {
  name: string;
  steps: Array<WineAppStep>;
};
