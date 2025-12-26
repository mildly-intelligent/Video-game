#!/bin/bash

project="/home/aurora/Projects/School/Video game/"
regex=^[0-9a-zA-Z_\\-\\.\\/\\\\]*\\.\(webm\|mpg\|mp2\|mpeg\|mpe\|pmv\|msx\|css\|tsv\|obj\|svg\|otf\|ttf\|vert\|frag\|bin\|xml\|stl\|mtl\|gif\|jpg\|jpeg\|png\|bmp\|wav\|flac\|oga\|m4p\|mp3\|aiff\|aif\|aac\|txt\|js\|html\|json\|jsonc\)$


rm -rf "$project/Composite/"
mkdir -p "$project/Composite/"

find "$project/" \
	-type f \
	-not -path "$project/.git/*" \
	-not -path "$project/Assets/*" \
	-not -path "$project/Composite/*" |
	awk -F\/ '{ $1=$2=$3=$4=$5=$6=""; print $0; }' |
	sed 's/^[[:blank:]]*//' |
	tr ' ' '\\\\' |
	while read -r file; do
		filepath="$(echo $file | tr '\\\\' '\\/')"
		echo "Compositing $file"
		if [[ "$file" =~ .js$ ]]; then
			echo Added to folder
		elif [[ "$file" =~ .css$ ]]; then
			echo Added to folder
		elif [[ "$file" =~ .html$ ]]; then
			echo Added to folder
		elif [[ "$file" =~ .txt$ ]]; then
			echo Added to folder
		elif [[ "$file" =~ .json$ ]]; then
			echo Added to folder
		else
			echo "Bad file type, renaming to $file.txt"
			file="$file.txt"
		fi
		ln "$project/$filepath" "$project/Composite/$file"
	done
