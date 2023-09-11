#!/bin/bash

# Script for generating an unique app name.
counter=0
parent_dir=$(dirname "$WINE_APP_PATH")
CURR_WINE_APP_NAME="$WINE_APP_NAME"

while [[ -d $WINE_APP_PATH ]]
do
  ((counter+=1))
  CURR_WINE_APP_NAME="${WINE_APP_NAME}_${counter}"
  WINE_APP_PATH="${parent_dir}/$CURR_WINE_APP_NAME.app";
done;

echo $CURR_WINE_APP_NAME