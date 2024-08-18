import {
  mkdirSync,
  rmSync,
  existsSync,
  cpSync,
  copyFileSync,
  chmodSync,
  renameSync,
} from 'fs';
import path from 'path';

const run = () => {
  const DIST_FOLDER_PATH = path.join('./dist');
  const BUILD_PATH = `${DIST_FOLDER_PATH}/library-ui`;
  const BINARIES_PATHS = [`${BUILD_PATH}/library-ui-mac_x64`];
  const EXTENSIONS_PATH = `${BUILD_PATH}/extensions`;
  const RESOURCES_NEU_PATH = `${BUILD_PATH}/resources.neu`;
  const RESOURCES_PATH = `./Contents/Resources`;

  for (const BINARY of BINARIES_PATHS) {
    const SUFFIX = BINARY.split('_').pop();
    if (SUFFIX === undefined) continue;
    const APP_PATH = `${DIST_FOLDER_PATH}/${SUFFIX}/WineMacApps`;
    const APP_DOTAPP_PATH = `${DIST_FOLDER_PATH}/${SUFFIX}/WineMacApps.app`;
    const APP_CONTENTS_PATH = `${APP_PATH}/Contents`;
    const APP_MACOS_PATH = `${APP_CONTENTS_PATH}/MacOS`;

    existsSync(APP_PATH) && rmSync(APP_PATH, { recursive: true });
    existsSync(APP_DOTAPP_PATH) && rmSync(APP_DOTAPP_PATH, { recursive: true });
    mkdirSync(APP_PATH, { recursive: true });
    mkdirSync(APP_MACOS_PATH, { recursive: true });
    cpSync(EXTENSIONS_PATH, `${APP_MACOS_PATH}/extensions`, {
      recursive: true,
    });
    cpSync(RESOURCES_PATH, `${APP_CONTENTS_PATH}/Resources`, {
      recursive: true,
    });
    cpSync(EXTENSIONS_PATH, `${APP_MACOS_PATH}/extensions`, {
      recursive: true,
    });
    copyFileSync(RESOURCES_NEU_PATH, `${APP_MACOS_PATH}/resources.neu`);
    copyFileSync(BINARY, `${APP_MACOS_PATH}/winemacapps`);
    chmodSync(`${APP_MACOS_PATH}/winemacapps`, '755');
    renameSync(APP_PATH, `${APP_PATH}.app`);
  }
};

run();
