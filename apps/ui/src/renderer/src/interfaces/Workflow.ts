import { ProcessStatus } from '@constants/enums';
import { Job } from '@interfaces/Job';

export type Workflow = {
  name: string;
  jobs: Job[];
  status?: ProcessStatus;
};
