import { ProcessStatus } from '@constants';
import { Job } from '@interfaces';

export type Workflow = {
  name: string;
  jobs: Job[];
  status?: ProcessStatus;
};
