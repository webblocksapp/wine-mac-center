#!/bin/bash

# Check if the correct number of arguments are provided
if [ "$#" -ne 2 ]; then
    echo "Missing arguments file path and size"    
    exit 1
fi

# Size transformed into bytes
given_split_size=$(($2 * 1000000))
input_file="$1"

# Check if the input file exists
if [ ! -f "$input_file" ]; then
    echo "Error: Input file '$input_file' not found."
    exit 1
fi

# Split the .7z file into two parts
echo "Splitting $input_file"
7z a -v"$given_split_size"b "${input_file%.7z}_part.7z" "$input_file"

echo "Splitting complete."