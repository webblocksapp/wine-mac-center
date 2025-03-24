if [ "$#" -ne 2 ]; then
    echo "Missing arguments file and target"    
    exit 1
fi

directory_path=$(dirname "$1")

7z x -y "$1" -o"$2"
rm -rf "$directory_path"