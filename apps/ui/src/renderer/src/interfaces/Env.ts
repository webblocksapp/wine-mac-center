import { WineEnv } from '@interfaces/WineEnv';

export type Env = {
  HOME: string;
  SCRIPTS_PATH: string;
  DIRNAME: string;
} & WineEnv;
