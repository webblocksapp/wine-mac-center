import { BashScript, ScriptOptions, ProcessStatus } from '@interfaces';

export type JobStep = {
  name: string;
  script?: string;
  bashScript?: BashScript;
  // fn?: (...args: any[]) => Promise<{
  //   cmd: Cmd;
  //   child: Child;
  // }>;
  options?: ScriptOptions;
  status?: ProcessStatus;
  output?: string;
};
