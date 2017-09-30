#!/bin/bash

##
# SYNOPSIS
#   ./build.sh [-n]
#
# DESCRIPTION
#   This script runs the tests and builds the index.html
#   file. Given the -n argument, it does not build or test
#   anything but instead prints the names of .js files in
#   src/ in the order in which they will be concatenated
#   when building the app code.
#

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

ensure_installed() {
  silent which $1 || npm install --global $1
}

md5_of_file() {
  if silent which md5; then
    # Mac OS
    cat "$1" | md5
  elif silent which md5sum; then
    # Linux
    cat "$1" | md5sum | awk '{print $1}'
  else
    >&2 echo "ERROR: *** Neither md5 nor md5sum is on the PATH. Please install one of them and try again."
    exit 1
  fi
}

need_to_rebuild_thirdparty_js() {
  ! test -f .build/thirdparty.min.js \
  || ! test -f .build/package.json.md5 \
  || ! test -f .build/manifest.js.md5 \
  || test "$(md5_of_file package.json)" \
          != "$(< .build/package.json.md5)" \
  || test "$(md5_of_file manifest.js)" \
          != "$(< .build/manifest.js.md5)"
}

uglify() {
  local input="$1"
  local output="$2"
  uglifyjs --compress --mangle -o "$output" -- "$input"
}

dry_run=no

while getopts "n" opt; do
  case "$opt" in
    n)
      dry_run=yes
      ;;
  esac
done

if [ "$dry_run" = "yes" ]; then
  lib_files src
  exit 0
fi

if ! silent which npm; then
  >&2 echo "ERROR: *** NPM not found. Please install it and try again."
  exit 1
fi

ensure_installed jasmine

mkdir -p .build

if need_to_rebuild_thirdparty_js; then
  npm install
  ensure_installed browserify
  ensure_installed uglifyjs
  browserify manifest.js -o .build/thirdparty.js
  uglify .build/thirdparty.js .build/thirdparty.min.js
  md5_of_file manifest.js > .build/manifest.js.md5
  md5_of_file package.json > .build/package.json.md5
fi

lib_files .web-quine-stuff | xargs cat > .build/app.js
cat .build/thirdparty.min.js >> .build/app.js
lib_files src | xargs cat >> .build/app.js
test_files | xargs cat .build/app.js > .build/test.js

jasmine .build/test.js

<.web-quine-stuff/template.html expand_includes > index.html
