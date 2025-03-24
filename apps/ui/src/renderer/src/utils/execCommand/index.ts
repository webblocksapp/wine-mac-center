import { exec } from 'child_process';

export const execCommand = async (cmd: string) => {
  return new Promise<{ stdOut: string; stdErr: string }>((resolve, reject) => {
    exec(cmd, (error, stdOut, stdErr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdOut, stdErr });
      }
    });
  });
};
