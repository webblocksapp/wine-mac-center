# Read variables
read
INFO_PLIST="$REPLY"
read
CONFIG_JSON="$REPLY"
read
EXE_PATH=$REPLY

# Creates info.plist file
CONTENTS_PATH="$WINE_APP_PATH/Contents"
cat <<EOM > "$CONTENTS_PATH/Info.plist"
$INFO_PLIST
EOM

# Creates config file
cat <<EOM > "$WINE_APP_PATH/$WINE_CONFIG_APP_NAME.app/Contents/Resources/data/config.json"
$CONFIG_JSON
EOM

# Creates launcher file
MACOS_PATH="$CONTENTS_PATH/MacOS"
mkdir $MACOS_PATH
EXEC_FILE="$MACOS_PATH/winemacapp"
cat <<EOM > $EXEC_FILE
#!/bin/sh
dir=\$(dirname "\${BASH_SOURCE[0]}")
cd \$dir
cd ../../$WINE_CONFIG_APP_NAME.app/Contents/Resources/bash
WINE_APP_SCRIPTS_PATH=\$PWD
source env.sh "" \$WINE_APP_SCRIPTS_PATH
\$WINE_APP_SCRIPTS_PATH/runExecutable.sh
EOM

chmod +x $EXEC_FILE