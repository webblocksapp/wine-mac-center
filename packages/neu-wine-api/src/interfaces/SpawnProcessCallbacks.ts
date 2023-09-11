export type SpawnProcessCallbacks = {
  onStdOut?: (data: any) => void;
  onStdErr?: (data: any) => void;
  onExit?: (data: any) => void;
};
