type ActionType = 'stdIn' | 'stdInEnd' | 'exit';

export type UpdateProcess = (action: ActionType, data: any) => Promise<void>;

export type SpawnProcessArgs = {
  onStdOut?: (data: any, updateProcess: UpdateProcess) => void | Promise<void>;
  onStdErr?: (data: any, updateProcess: UpdateProcess) => void | Promise<void>;
  onExit?: (data: any) => void | Promise<void>;
  action?: { type: ActionType; data: any };
};
