import { WineAppConfig } from '@interfaces';

export const wineAppsConfigs: Array<WineAppConfig & { keyName: string }> = [
  {
    keyName: 'c&c3',
    id: '75a55d4f-6dcc-498a-b74a-f8765c6683e8',
    winetricks: { verbs: ['steam'] },
    engineVersion: 'WS11WineCX64Bit23.6.0',
    engineURLs: [],
    dxvkEnabled: true,
    setupExecutablePath: '',
    executables: [
      {
        main: true,
        path: '/drive_c/Program Files (x86)/Steam/Steam.exe',
        flags:
          '-noreactlogin -allosarches -cef-force-32bit -udpforce -no-cef-sandbox -applaunch 24790',
      },
    ],
  },
  {
    keyName: 'steam',
    id: 'f339cf36-c576-11ee-935b-685b35922e40',
    winetricks: { verbs: [] },
    engineVersion: 'WS11WineCX64Bit23.6.0',
    engineURLs: [],
    dxvkEnabled: true,
    setupExecutablePath: '',
    executables: [
      {
        main: true,
        path: '/drive_c/Program Files (x86)/Steam/Steam.exe',
        flags:
          '-noreactlogin -allosarches -cef-force-32bit -udpforce -no-cef-sandbox',
      },
    ],
  },
];
