#!/bin/bash -e

lib_files() {
  find src -name '*.js' | grep -v '^src/main.js$'
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
lib_files | xargs cat > .build/app.js
test_files | xargs cat .build/app.js > .build/test.js

jasmine .build/test.js

<main.html expand_includes > index.html
