import { ProcessStatus } from '@constants/enums';

export type WineAppStep = {
  name: string;
  status: ProcessStatus;
  output: string;
};
