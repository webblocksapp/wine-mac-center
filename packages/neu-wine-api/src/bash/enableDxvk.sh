MOLTENVK_LIB=$WINE_LIBS_PATH/libMoltenVK.dylib
cp $MOLTENVK_LIB $WINE_APP_ENGINE_PATH/lib/wine/x86_64-unix;
$WINE_APP_SCRIPTS_PATH/winetrick.sh --force --unattended dxvk_macos.verb