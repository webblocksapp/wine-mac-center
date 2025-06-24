type ActionType = 'stdIn' | 'stdInEnd' | 'exit';

export type UpdateProcess = (action: ActionType, data?: any) => Promise<void>;

export type SpawnProcessArgs = {
  onStdOut?: (data: string, updateProcess?: UpdateProcess) => void;
  onStdErr?: (data: string, updateProcess?: UpdateProcess) => void;
  onExit?: (data: string | number | null) => void;
  action?: { type: ActionType; data: string };
  debug?: boolean;
};
