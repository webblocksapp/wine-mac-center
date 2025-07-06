#!/bin/bash
wineEnv() {
  if [[ -e "$WINE_APP_BIN_PATH/wine32on64" ]]; then
    WINE_BIN=$WINE_APP_BIN_PATH/wine32on64
  else
    WINE_BIN=$WINE_APP_BIN_PATH/wine64
  fi

  WINE_ARCH=$1
  EXE_FILE=$2
  EXE_FLAGS=$3

  export DYLD_FALLBACK_LIBRARY_PATH="${DYLD_FALLBACK_LIBRARY_PATH}:$WINE_APP_FRAMEWORKS_PATH"
  export PATH="$WINE_APP_BIN_PATH:$PATH"
  export WINEPREFIX="$WINE_APP_PREFIX_PATH" 

  "$WINE_BIN" "$EXE_FILE" "$EXE_FLAGS" &
  launch_wine_pid=$!
  
  wait $launch_wine_pid

  sleep 1

  wine_pids=$(ps -eo pid,command | grep -i "wine.*$EXE_FILE" | grep -v grep | awk '{print $1}')
  wine_pid=$(ps -eo pid,command | grep -i "wine.*$EXE_FILE" | grep -v grep | awk '{print $1}' | head -n 1)

  echo "WINE PIDS: $wine_pids"  
  echo "Tracking PID: $wine_pid"

  # Wait for that PID to exit
  while ps -p "$wine_pid" > /dev/null; do
    sleep 1
  done
}

wineEnv "$@"