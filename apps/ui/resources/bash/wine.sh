#!/bin/bash
wine() {
  if [[ -e "$WINE_APP_BIN_PATH/wine32on64" ]]; then
    WINE_ARCH=wine32on64
  else
    WINE_ARCH=wine64
  fi

  EXE_PATH=$(printf "%b" "$1")   # unescape if needed
  EXE_FLAGS="$2"

  EXE_DIR=$(dirname "$EXE_PATH")
  EXE_FILE=$(basename "$EXE_PATH")

  cd "$EXE_DIR" || exit 1
  "$WINE_APP_SCRIPTS_PATH/wineEnv.sh" "$WINE_ARCH" "$EXE_FILE" "$EXE_FLAGS"
}

wine "$@"