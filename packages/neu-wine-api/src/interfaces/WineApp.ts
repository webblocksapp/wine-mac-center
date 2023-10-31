import { createWineApp } from '@utils';

export type WineApp = Awaited<ReturnType<typeof createWineApp>>;
