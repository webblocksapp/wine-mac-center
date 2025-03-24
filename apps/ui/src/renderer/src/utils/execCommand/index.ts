export const execCommand = (
  cmd: string
): Promise<{
  stdOut: string;
  stdErr: string;
}> => window.api.execCommand(cmd);
