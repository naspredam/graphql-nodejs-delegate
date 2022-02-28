for file in *; do
    if [ -d "$file" ]; then
        echo "Building image of directory $file"
        `cd "$file" && docker build -t "${file}" .`
    fi
done
