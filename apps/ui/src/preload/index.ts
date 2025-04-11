import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
// @ts-ignore (renderer type)
import { SpawnProcessArgs } from '../renderer/src/interfaces';
import { writeFile } from 'fs';
import { ElectronApi } from '../main';

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
  dirExists: (dirPath: string) => Promise<boolean>;
  readBinaryFile: (filePath: string) => Promise<Buffer>;
  createDirectory: (dirPath: string) => Promise<void>;
  readFileAsString: (filePath: string) => Promise<string>;
};

type RendererApi = Record<keyof Api, (...args: any) => Promise<any>>;

// Custom APIs for renderer
const api: RendererApi = {
  getAppPath: () => ipcRenderer.invoke(ElectronApi.GetAppPath),
  execCommand: (cmd: string) => ipcRenderer.invoke(ElectronApi.ExecCommand, cmd),
  pathJoin: (...paths: string[]) => ipcRenderer.invoke(ElectronApi.PathJoin, ...paths),
  spawnProcess: (...args) => ipcRenderer.invoke(ElectronApi.SpawnProcess, ...args),
  fileExists: (path: string) => ipcRenderer.invoke(ElectronApi.FileExist, path),
  writeFile: (...args) => ipcRenderer.invoke(ElectronApi.WriteFile, ...args),
  readDirectory: (dirPath: string) => ipcRenderer.invoke(ElectronApi.ReadDirectory, dirPath),
  dirExists: (dirPath: string) => ipcRenderer.invoke(ElectronApi.DirExists, dirPath),
  readBinaryFile: (...args) => ipcRenderer.invoke(ElectronApi.ReadBinaryFile, ...args),
  createDirectory: (dirPath: string) => ipcRenderer.invoke(ElectronApi.CreateDirectory, dirPath),
  readFileAsString: (filePath: string) => ipcRenderer.invoke(ElectronApi.ReadFileAsString, filePath)
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
