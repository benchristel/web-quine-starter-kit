#!/bin/bash

lib_files() {
  local DIR="$1"
  # if the preamble directory exists, list the files
  # within it first. This recurses so if preamble
  # contains a preamble directory of its own, it's
  # loaded before any other files, and so on.
  [ -d "$DIR/preamble" ] && lib_files "$DIR/preamble"

  # then list all other .js files, except main.js
  find "$DIR" -name '*.js' \
    | grep -v "^$DIR/preamble/" \
    | grep -v "^$DIR/main.js$"
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
