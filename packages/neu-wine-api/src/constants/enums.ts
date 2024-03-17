export enum ProcessStatus {
  InProgress = 'inProgress',
  Success = 'success',
  Pending = 'pending',
  Cancelled = 'cancelled',
  Error = 'error',
}

export enum ExitCode {
  SuccessfulExecution = 0,
  Error = 1,
  ImproperCommand = 2,
}

export enum FileName {
  CFBundleExecutable = 'winemacapp',
  CFBundleIconFile = 'winemacapp.icns',
}
