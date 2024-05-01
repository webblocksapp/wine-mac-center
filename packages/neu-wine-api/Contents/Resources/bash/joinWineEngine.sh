if [ "$#" -ne 2 ]; then
    echo "Missing arguments file and target"    
    exit 1
fi

7z x "$1" -o"$2"