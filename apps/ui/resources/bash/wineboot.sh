#!/bin/bash
run() {
  "$WINE_APP_SCRIPTS_PATH/wine.sh" wineboot "$@"
}

run "$@"