# Initializes the environment variables which contains
# the path locations for running wine.
env() {
  mode=$1
  WINE_APP_SCRIPTS_PATH=$2
  # Gets the folder path of shell scripts.
  # If no scripts path is given, it takes by default the script folder.
  if test -z "$WINE_APP_SCRIPTS_PATH"
  then
    dir=$(dirname "${BASH_SOURCE[0]}")
    WINE_APP_SCRIPTS_PATH=$dir
  fi
  
  export WINE_APP_SCRIPTS_PATH
  
  # Shell scripts folder is the current directory used as reference
  # to start creating the paths for the rest of folders.
  
  # Current script location:
  # Dev mode: /root/apps/config-app/src-tauri/target/debug/bash
  # Prod mode: /MyWineApp.app/Config.app/Contents/Resources/bash
  cd $WINE_APP_SCRIPTS_PATH;
  cd ../
  export WINE_APP_CONFIG_JSON=$PWD/data/config.json
  
  # Current directory is changed according to environment mode.
  if [[ $mode == "development" ]]
  then
    cd ../../../../../packages/app-contents
  else
    cd ../../../Contents # Makes current dir /WineApp.app/Contents
  fi
  
  dir=$PWD
  
  export WINE_BASE_PATH="$HOME/Wine"
  export WINE_LIBS_PATH="$WINE_BASE_PATH/libs"
  export WINE_ENGINES_PATH="$WINE_BASE_PATH/engines"
  export WINE_APP_CONTENTS_PATH=$dir
  export WINE_APP_SHARED_SUPPORT_PATH=$WINE_APP_CONTENTS_PATH/SharedSupport
  export WINE_APP_PREFIX_PATH=$WINE_APP_SHARED_SUPPORT_PATH/prefix
  export WINE_APP_ENGINE_PATH=$WINE_APP_SHARED_SUPPORT_PATH/wine
  export WINE_APP_LOGS_PATH=$WINE_APP_SHARED_SUPPORT_PATH/Logs
  export WINE_APP_BIN_PATH=$WINE_APP_SHARED_SUPPORT_PATH/wine/bin
  export WINE_APP_FRAMEWORKS_PATH=$WINE_APP_CONTENTS_PATH/Frameworks
  export WINE_APP_DRIVE_C_PATH=$WINE_APP_PREFIX_PATH/drive_c
  export PATH=$PATH:$WINE_APP_SCRIPTS_PATH
}

env "$@"