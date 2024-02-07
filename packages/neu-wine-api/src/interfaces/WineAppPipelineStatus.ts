import { ProcessStatus } from '@interfaces';
import { WineAppJob } from 'dev-dist';

export type WineAppPipelineStatus = {
  id: string;
  status: ProcessStatus;
  jobs: WineAppJob[];
};
