export const WINE_APPS_SRC_URL =
  'https://raw.githubusercontent.com/webblocksapp/wine-mac-center/master/packages/wine-apps-configs/src';
export const WINE_APPS_CONFIGS_URL = `${WINE_APPS_SRC_URL}/configs`;
export const WINE_APPS_DOWNLOADABLES_URL = `${WINE_APPS_SRC_URL}/downloadables`;
export const WINE_APPS_ENGINES_URL = `${WINE_APPS_DOWNLOADABLES_URL}/engines`;
export const WINE_APPS_SETUP_EXECUTABLES_URL = `${WINE_APPS_DOWNLOADABLES_URL}/setup-executables`;

export const DOWNLOADABLES_URLS: { [key: string]: string } = {
  '{{Steam}}': `${WINE_APPS_SETUP_EXECUTABLES_URL}/SteamSetup.exe`,
};
