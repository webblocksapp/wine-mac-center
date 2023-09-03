#!/bin/bash
wine() {
  if [[ -e "$WINE_APP_BIN_PATH/wine32on64" ]]; then
    WINE_ARCH=wine32on64
  else
    WINE_ARCH=wine64
  fi

  $WINE_APP_SCRIPTS_PATH/wineEnv.sh $WINE_ARCH "$@"
}

wine "$@"