export enum WinetrickActionType {
  LIST = 'WINETRICK:LIST',
  LOADING = 'WINETRICK:LOADING',
}

export enum WineEngineActionType {
  LIST = 'WINE_ENGINE:LIST',
  LOADING = 'WINE_ENGINE:LOADING',
}

export enum WineAppConfigActionType {
  LIST_ALL = 'WINE_APP_CONFIG:LIST_ALL',
  LOADING = 'WINE_APP_CONFIG:LOADING',
  PATCH = 'WINE_APP_CONFIG:PATCH',
}

export enum WineAppPipelineActionType {
  PATCH = 'WINE_APP_PIPELINE:PATCH',
}

export enum AppActionType {
  SHOW_MESSAGE = 'APP:SHOW_MESSAGE',
}
