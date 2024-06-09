import { WineAppConfig as BaseWineAppConfig } from 'neu-wine-api';

export type WineAppConfig = Omit<BaseWineAppConfig, 'name'>;
