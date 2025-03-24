import { Env } from '@interfaces/Env';

export type ScriptOptions = {
  force?: boolean;
  env?: Env;
  args?: string;
};
