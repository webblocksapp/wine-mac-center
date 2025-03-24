export {};

declare global {
  interface Window {
    api: {
      getAppPath: () => Promise<string>;
      runCommand: (cmd: string) => Promise<{
        stdOut: string;
        stdErr: string;
      }>;
    };
  }
}
