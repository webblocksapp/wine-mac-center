import { setupWorker } from 'msw/browser';
import * as handlers from './handlers';

export const worker = setupWorker(...Object.values(handlers).flat());
