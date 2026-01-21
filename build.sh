#!/bin/bash

# Directory for the project
project="/home/aurora/Projects/School/Video game/"

# Remove the build folder and add a new one if it's already there
rm -rf "$project/Build/"
mkdir -p "$project/Build/"

# Get all files in directory, exclude folders, and the `.git` and `Build` folders
find "$project/" \
	-type f \
	-not -path "$project/.git/*" \
	-not -path "$project/Build/*" |
	awk -F\/ '{ $1=$2=$3=$4=$5=$6=""; print $0; }' |
# Remove leading spaces
	sed 's/^[[:blank:]]*//' |
# Clean up awk's mess and use backslashes instead of forward slashes (UNIX doesn't like file names with `/` in them)
	tr ' ' '\\\\' |
# Loop through the files
while read -r file; do
	# Get a new variable with the correct direction slash for the full path of the file
	# There's 100% a better way of doing this but I suck at bash
	filepath="$(echo $file | tr '\\\\' '\\/')"
	echo "Building $file"
	# Include all file with accepted filetype
	if [[ "$file" =~ \.js$ ]]; then
		echo Added to folder
	elif [[ "$file" =~ \.css$ ]]; then
		echo Added to folder
	elif [[ "$file" =~ \.html$ ]]; then
		echo Added to folder
	elif [[ "$file" =~ \.txt$ ]]; then
		echo Added to folder
	elif [[ "$file" =~ \.json$ ]]; then
		echo Added to folder
	elif [[ "$file" =~ \.ttf$ ]]; then
		echo Added to folder
	elif [[ "$file" =~ \.frag$ ]]; then
		echo Added to folder
	elif [[ "$file" =~ \.vert$ ]]; then
		echo Added to folder
	elif [[ "$file" =~ \.glsl$ ]]; then
		echo Added to folder
	else
		echo "Bad file type, renaming to $file.txt"
		# Append .txt to the name so https://editor.p5.js doesn't yell at me
		file="$file.txt"
	fi
	# Link the files to the place in Build
	ln "$project/$filepath" "$project/Build/$file"
done