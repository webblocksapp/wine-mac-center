import { ProcessStatus } from 'neu-wine-api';

export const PROCESS_STATUS_COLORS: Record<ProcessStatus, string> = {
  cancelled: 'primary.light',
  error: 'error.main',
  inProgress: 'info.main',
  pending: 'warning.main',
  success: 'success.main',
};
