#!/bin/bash

mkdir -p "$WINE_APP_PATH"
mkdir -p "$WINE_APP_CONTENTS_PATH"

cp -R "$INTERNAL_APPS_PATH/$WINE_CONFIG_APP_NAME.app" "$WINE_APP_PATH"
cp -R "$SCRIPTS_PATH" "$WINE_APP_SCRIPTS_PATH"

mkdir -p "$WINE_APP_DATA_PATH"

source "$SCRIPTS_PATH/env.sh"

# Creates the initial folder structure
mkdir -p "$WINE_APP_LOGS_PATH"
mkdir -p "$WINE_APP_ENGINE_PATH"
mkdir -p "$WINE_APP_PREFIX_PATH"
mkdir -p "$WINE_APP_FRAMEWORKS_PATH"

# Frameworks path is taken from Config.app env
tar -xf "$COMPRESSED_PATH/Frameworks.tgz" -C "$WINE_APP_FRAMEWORKS_PATH" -v