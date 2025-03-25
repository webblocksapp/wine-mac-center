type ActionType = 'stdIn' | 'stdInEnd' | 'exit';

export type UpdateProcess = (action: ActionType, data?: any) => Promise<void>;

export type SpawnProcessArgs = {
  onStdOut?: (data: string, updateProcess: UpdateProcess) => void | Promise<void>;
  onStdErr?: (data: string, updateProcess: UpdateProcess) => void | Promise<void>;
  onExit?: (data: string | number | null) => void | Promise<void>;
  action?: { type: ActionType; data: string };
};
