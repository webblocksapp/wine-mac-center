import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
// @ts-ignore (renderer type)
import { SpawnProcessArgs } from '../renderer/src/interfaces';
import { writeFile } from 'fs';

export type Api = {
  getAppPath: () => Promise<string>;
  execCommand: (cmd: string) => Promise<{
    stdOut: string;
    stdErr: string;
  }>;
  pathJoin: (...paths: string[]) => Promise<string>;
  spawnProcess: (command: string, args?: SpawnProcessArgs) => Promise<void>;
  fileExists: (path: string) => Promise<boolean>;
  writeFile: typeof writeFile;
  readDirectory: (dirPath: string) => Promise<string[]>;
};

type RendererApi = Record<keyof Api, (...args: any) => Promise<any>>;

// Custom APIs for renderer
const api: RendererApi = {
  getAppPath: () => ipcRenderer.invoke('get-app-path'),
  execCommand: (cmd: string) => ipcRenderer.invoke('exec-command', cmd),
  pathJoin: (...paths: string[]) => ipcRenderer.invoke('path-join', ...paths),
  spawnProcess: (...args) => ipcRenderer.invoke('spawn-process', ...args),
  fileExists: (path: string) => ipcRenderer.invoke('file-exists', path),
  writeFile: (...args) => ipcRenderer.invoke('spawn-process', ...args),
  readDirectory: (dirPath: string) => ipcRenderer.invoke('read-directory', dirPath)
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
