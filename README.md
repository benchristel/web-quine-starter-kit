# Web Quine Starter Kit

This repository contains everything\* you need to get
started building a Web Quine. A Web Quine is an application
that runs in a web browser and stores data locally in an
append-only log of immutable revisions of its source code.

\* It doesn't provide facilities for pulling in NPM
packages, yet, because that's fairly complicated and using
something like Browserify or Webpack would dramatically
increase build times.

## Getting Started

Copy the command below to clone this repo and tidy it up
for your new project.

```bash
curl https://raw.githubusercontent.com/benchristel/web-quine-starter-kit/master/setup.sh | bash
```

The repo will be cloned with a randomly-generated name like
`web-quine-21963-1923`. Feel free to rename it to something
more appropriate.

Once you've done that, you can `cd` into your new project
directory and run

```bash
./build.sh
```

which runs the tests and creates an `index.html` file. Open
the `index.html` file in a browser to run the app.

## Project Structure

In order to write your app code effectively, you'll need to
know a bit about how it gets compiled into the `index.html`
file.

Conceptually, everything in `src/` gets concatenated into
one big JavaScript file, which is then copy-pasted into the
HTML. Be aware that the order in which files are
concatenated is not guaranteed, with the exception that the
`main.js` file always goes at the end, and any files in
the `src/preamble/` directory go first. That means that
files other than `main.js` generally should not depend on
any other files having been loaded first, though if you
can't avoid an ordering dependency between files the file
that must run first should go in `src/preamble/`.

To make that a bit more concrete, here's an example of
what *won't* work:

```javascript
// foo.js

function foo() {
  alert(message)
}

// bar.js

// this will alert "undefined" because `message` has not yet been set
foo()

// message.js

var message = "hello"
```

However, the following is fine because `main.js` is always
executed last:

```javascript
// foo.js

function foo() {
  alert(message)
}

// message.js

var message = "hello"

// main.js

// this alerts "hello" as expected
foo()
```
