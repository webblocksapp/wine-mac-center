winetrick() {
  WINETRICKS_FALLBACK_LIBRARY_PATH=$WINE_APP_FRAMEWORKS_PATH \
  $WINE_APP_SCRIPTS_PATH/wineEnv.sh \
  $WINE_APP_SCRIPTS_PATH/winetricks.sh $@;
}

winetrick "$@"