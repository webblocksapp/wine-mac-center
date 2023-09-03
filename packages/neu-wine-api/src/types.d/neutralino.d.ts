declare namespace Neutralino {
  interface InitOptions {
    load?: () => void;
    pingSuccessCallback?: () => void;
    pingFailCallback?: () => void;
  }

  function init(options?: InitOptions): void;

  interface StdoutData {
    stdout: string;
  }

  namespace os {
    function runCommand(
      command: string,
      success: (data: StdoutData) => void,
      fail: () => void
    ): void;
    function spawnProcess(command: string): Promise<{ id: number; pid: number }>;
  }

  namespace events {
    function on(
      eventName: string,
      handler: (event: {
        detail: { data?: any; id: number; action: 'stdOut' | 'stdErr' | 'exit' };
      }) => void
    ): void;
  }
}
