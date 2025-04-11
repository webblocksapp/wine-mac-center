import { app, shell, BrowserWindow, ipcMain } from 'electron';
import path, { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import { exec } from 'child_process';
import { spawn } from 'child_process';
import { promises as fs, writeFile, existsSync, readFile } from 'fs';

export enum ElectronApi {
  GetAppPath = 'get-app-path',
  ExecCommand = 'exec-command',
  PathJoin = 'path-join',
  SpawnProcess = 'spawn-process',
  FileExist = 'file-exists',
  WriteFile = 'write-file',
  ReadDirectory = 'read-directory',
  DirExists = 'dir-exists',
  ReadBinaryFile = 'read-binary-file',
  CreateDirectory = 'create-directory',
  ReadFileAsString = 'read-file-as-string'
}

// @ts-ignore (renderer type)
import { SpawnProcessArgs, UpdateProcess } from '../renderer/src/interfaces';

ipcMain.handle('get-app-path', async () => {
  return app.getAppPath(); // or __dirname
});
ipcMain.handle('exec-command', async (_, cmd: string) => {
  return new Promise<{ stdOut: string; stdErr: string }>((resolve, reject) => {
    exec(cmd, (error, stdOut, stdErr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdOut, stdErr });
      }
    });
  });
});
ipcMain.handle('path-join', (_, ...paths: string[]) => path.join(...paths));
ipcMain.handle('spawn-process', (_, command: string, args?: SpawnProcessArgs): Promise<void> => {
  const child = spawn(command, {
    stdio: 'pipe',
    shell: true // Required to run the whole string in a shell
  });

  const updateProcess: UpdateProcess = async (action, data) => {
    if (action === 'stdIn') {
      child.stdin.write(data);
    }

    if (action === 'stdInEnd') {
      child.stdin.write(data);
    }

    if (action === 'exit') {
      child.stdin.write(data);
    }
  };

  args?.action && updateProcess(args.action.type, args.action.data);

  return new Promise((resolve) => {
    child.stdout.on('data', async (data) => {
      await args?.onStdOut?.(data, updateProcess);
    });

    child.stderr.on('data', async (data) => {
      await args?.onStdErr?.(data, updateProcess);
    });

    child.on('close', async (code) => {
      await args?.onExit?.(code);
      if (args) args = {}; //Callback is cleaned from subscription
      resolve(undefined);
    });
  });
});

ipcMain.handle('file-exists', async (_, filePath: string) => {
  try {
    const fullPath = path.resolve(filePath);
    await fs.access(fullPath);
    return true;
  } catch {
    return false;
  }
});

ipcMain.handle('write-file', async (_, ...args: Parameters<typeof writeFile>) =>
  writeFile(...args)
);

ipcMain.handle('read-directory', async (_, dirPath: string) => {
  try {
    const entries = await fs.readdir(dirPath);
    return entries;
  } catch (error) {
    console.error(`Error reading directory at ${dirPath}:`, error);
    throw error;
  }
});

ipcMain.handle('dir-exists', async (_, dirPath: string) => existsSync(dirPath));
ipcMain.handle('read-binary-file', async (_, filePath: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
});

ipcMain.handle('create-directory', async (_, dirPath: string) => {
  try {
    await fs.mkdir(dirPath);
  } catch (error) {
    console.error(`Error reading directory at ${dirPath}:`, error);
    throw error;
  }
});

ipcMain.handle('read-file-as-string', async (_, filePath: string): Promise<string> => {
  try {
    return fs.readFile(filePath, 'utf-8');
  } catch (error) {
    throw error;
  }
});

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      devTools: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.webContents.openDevTools();

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on('ping', () => console.log('pong'));

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
