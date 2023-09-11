import { WineEnv } from '@interfaces';

export type Env = {
  HOME: string;
  SCRIPTS_PATH: string;
  DIRNAME: string;
} & WineEnv;
