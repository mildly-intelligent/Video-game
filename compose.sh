#!/bin/bash

project="/home/aurora/Projects/School/Video game/"

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
		ln "$project/$filepath" "$project/Composite/$file"
	done
