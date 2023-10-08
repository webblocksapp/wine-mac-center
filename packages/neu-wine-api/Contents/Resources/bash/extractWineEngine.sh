rm -R "$WINE_APP_ENGINE_PATH/"*;
tar -xf "$WINE_ENGINES_PATH/$WINE_ENGINE_VERSION.tar.7z" -C "$WINE_APP_PATH" -v;
mv "$WINE_APP_PATH/wswine.bundle/"* "$WINE_APP_ENGINE_PATH";
rm -r "$WINE_APP_PATH/wswine.bundle";