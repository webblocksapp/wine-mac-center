import {
  mkdirSync,
  rmSync,
  existsSync,
  cpSync,
  copyFileSync,
  chmodSync,
  renameSync,
  readdirSync,
  writeFileSync,
} from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import plist from 'plist';

const CFBundleExecutable = 'winemacapps';
const CFBundleName = 'Wine Mac Apps';
const CFBundleIdentifier = 'com.webblocksapp';
const CFBundleSignature = '????';

const run = () => {
  const DIST_FOLDER_PATH = path.join('./dist');
  const BUILD_PATH = `${DIST_FOLDER_PATH}/library-ui`;
  const BINARIES_PATHS = [`${BUILD_PATH}/library-ui-mac_x64`];
  const EXTENSIONS_PATH = `${BUILD_PATH}/extensions`;
  const RESOURCES_NEU_PATH = `${BUILD_PATH}/resources.neu`;
  const RESOURCES_PATH = `./Contents/Resources`;
  const FOLDERS_PATH_TO_KEEP: string[] = [];

  for (const BINARY of BINARIES_PATHS) {
    const SUFFIX = BINARY.split('_').pop();
    if (SUFFIX === undefined) continue;

    FOLDERS_PATH_TO_KEEP.push(SUFFIX);

    const APP_PATH = `${DIST_FOLDER_PATH}/${SUFFIX}/${CFBundleName}`;
    const APP_DOTAPP_PATH = `${DIST_FOLDER_PATH}/${SUFFIX}/${CFBundleName}.app`;
    const APP_CONTENTS_PATH = `${APP_PATH}/Contents`;
    const APP_PLIST_PATH = `${APP_CONTENTS_PATH}/info.plist`;
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
    copyFileSync(BINARY, `${APP_MACOS_PATH}/${CFBundleExecutable}`);
    chmodSync(`${APP_MACOS_PATH}/${CFBundleExecutable}`, '755');

    const infoPlistXML = plist
      .build({
        CFBundleExecutable,
        CFBundleName,
        CFBundleIdentifier,
        CFBundleSignature,
      })
      .replace(/\n/gi, '');

    writeFileSync(APP_PLIST_PATH, infoPlistXML);
    renameSync(APP_PATH, `${APP_PATH}.app`);

    const zipApp = `
      cd ${DIST_FOLDER_PATH}/${SUFFIX} && zip -r Wine_Mac_Apps_${SUFFIX}.zip "${CFBundleName}.app"
    `;
    execSync(zipApp);
    rmSync(APP_DOTAPP_PATH, { recursive: true, force: true });
  }

  const files = readdirSync(DIST_FOLDER_PATH);
  const filesToDelete = files.filter(
    (file) => !FOLDERS_PATH_TO_KEEP.includes(file),
  );

  filesToDelete.forEach((file) => {
    const filePath = path.join(DIST_FOLDER_PATH, file);
    existsSync(filePath) && rmSync(filePath, { recursive: true, force: true });
  });
};

run();
