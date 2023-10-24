type ActionType = 'stdIn' | 'stdInEnd' | 'exit';

export type UpdateProcess = (action: ActionType, data: any) => Promise<void>;

export type SpawnProcessArgs = {
  onStdOut?: (data: any, updateProcess: UpdateProcess) => void;
  onStdErr?: (data: any, updateProcess: UpdateProcess) => void;
  onExit?: (data: any) => void;
  action?: { type: ActionType; data: any };
};
