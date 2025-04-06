import { WineAppConfig as BaseWineAppConfig } from '@interfaces/WineAppConfig';

export type WineAppConfigItem = Omit<BaseWineAppConfig, 'name'>;
