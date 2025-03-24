import { ProcessStatus } from '@constants';

export type WineAppStep = {
  name: string;
  status: ProcessStatus;
  output: string;
};
