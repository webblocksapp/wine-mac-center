# Read variables
read
INFO_PLIST="$REPLY"
read
EXE_PATH=$REPLY

# Creates info.plist file
CONTENTS_PATH="$WINE_APP_PATH/Contents"
cat <<EOM > "$CONTENTS_PATH/Info.plist"
$INFO_PLIST
EOM

# Creates launcher file
MACOS_PATH="$CONTENTS_PATH/MacOS"
mkdir "$MACOS_PATH"
EXEC_FILE="$MACOS_PATH/winemacapp"
cat <<EOM > "$EXEC_FILE"
#!/bin/sh
dir=\$(dirname "\${BASH_SOURCE[0]}")
# Initialize wine config.
cd "\$dir"
cd "../../$WINE_CONFIG_APP_NAME.app/Contents/Resources/data"
export WINE_APP_CONFIG_JSON_PATH="\$PWD/config.json"
# Initialize app path.
cd "\$dir"
cd "../../"
export WINE_APP_PATH="\$PWD"
# Initialize scripts path.
cd "\$dir"
cd "../../$WINE_CONFIG_APP_NAME.app/Contents/Resources/bash"
export WINE_APP_SCRIPTS_PATH=\$PWD
source env.sh
"\$WINE_APP_SCRIPTS_PATH/runExecutable.sh"
EOM

chmod +x "$EXEC_FILE"
echo "App bundled successfully"