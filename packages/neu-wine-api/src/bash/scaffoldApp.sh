#!/bin/bash
mkdir -p $WINE_APP_PATH
mkdir -p $WINE_APP_CONTENTS_PATH
tar -xf $COMPRESSED_PATH/$WINE_CONFIG_APP_NAME.tgz -C $WINE_APP_PATH -v

# Loads env from Config.app/Resources/bash/env.sh
source $WINE_APP_SCRIPTS_PATH/env.sh

# Creates the initial folder structure
mkdir -p $WINE_APP_LOGS_PATH
mkdir -p $WINE_APP_ENGINE_PATH
mkdir -p $WINE_APP_PREFIX_PATH
mkdir -p $WINE_APP_FRAMEWORKS_PATH

# Frameworks path is taken from Config.app env
tar -xf $COMPRESSED_PATH/Frameworks.tgz -C $WINE_APP_FRAMEWORKS_PATH -v