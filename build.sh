#!/bin/bash

read_preserving_whitespace() {
  IFS= read -r $1
}

lib_files() {
  local DIR="$1"

  # recurse depth-first into all subdirectories
  find "$DIR" -type directory -depth 1 \
  | (while read_preserving_whitespace subdir; do
    lib_files "$subdir"
  done)

  # then list all other .js files, except main.js, in
  # alphabetical order
  find "$DIR" -name '*.js' -type file -depth 1 \
    | grep -v "^$DIR/main.js$" \
    | sort
}

test_files() {
  find test -name '*.js'
}

silent() {
  &>/dev/null "$@"
}

read_preserving_whitespace() {
  IFS= read -r $1
}

expand_includes() {
  while read_preserving_whitespace line; do
    if [[ $line =~ ^\#include ]]; then
      echo "$line" | sed 's/#include \(.*\)/\1/' | xargs cat
    else
      echo "$line"
    fi
  done
}

if ! silent which npm; then
  >&2 echo "NPM not found. Please install it first."
  exit 1
fi

# Ensure the Jasmine test framework is installed
silent which jasmine || npm i -g jasmine

mkdir -p .build
lib_files src | xargs cat > .build/app.js
test_files | xargs cat .build/app.js > .build/test.js

jasmine .build/test.js

<main.html expand_includes > index.html
