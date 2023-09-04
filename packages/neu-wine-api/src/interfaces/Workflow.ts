import { Job, ProcessStatus } from '@interfaces';

export type Workflow = {
  name: string;
  jobs: Job[];
  status?: ProcessStatus;
};
