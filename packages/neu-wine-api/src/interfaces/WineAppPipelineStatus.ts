import { ProcessStatus } from '@interfaces';
import { WineAppJob } from 'dev-dist';

export type WineAppPipelineStatus = {
  pipelineId: string;
  status: ProcessStatus;
  jobs: WineAppJob[];
};
