import { CommonObject } from '@interfaces';

export type Env = Partial<{
  HOME: string;
  SCRIPTS_PATH: string;
  WINE_ENGINE_VERSION: string;
  DIRNAME: string;
}> &
  CommonObject;
