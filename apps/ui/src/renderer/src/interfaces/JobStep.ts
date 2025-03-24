import { ProcessStatus } from '@constants/enums';
import { BashScript } from '@interfaces/BashScript';
import { ScriptOptions } from '@interfaces/ScriptOptions';

export type JobStep = {
  name: string;
  script?: string;
  bashScript?: BashScript;
  options?: ScriptOptions;
  status?: ProcessStatus;
  output?: string;
};
