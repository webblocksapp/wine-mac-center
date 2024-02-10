import { ProcessStatus } from '@constants';
import { WineAppJob } from '@interfaces';

export type WineAppPipelineStatus = {
  pipelineId: string;
  status: ProcessStatus;
  jobs: WineAppJob[];
};
