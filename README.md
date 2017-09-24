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
the `index.html` file in a browser to run the demo app.

## Okay, I ran the demo app. What now?

Read the rest of this document to learn how to replace
the demo code with your own application.

## Project Structure

The demo project contains many files and directories. Some
of these are considered "magic" by the web quine framework
(in other words, things will break if you move or rename
them). Other files are app-level code that you can refactor
or rename to your heart's content. This section will help
you understand which is which.

### Magic Directories

The `src/` and `test/` directories are hardcoded into the
framework's assumptions about how files are organized, so
don't rename them (or be ready to change `build.sh` if you
do). You're free to organize files within those directories
any way you like, though.

The hidden `.build` directory contains generated files.
You can remove it if you like; it will be recreated when you
run `./build.sh`.

### Magic Files

Here is a complete list of files that have special meaning
to the `./build.sh` script.

- `main.html`
- `index.html`
- `src/body.html`
- `src/main.js`

## Understanding the build process

When you run `./build.sh`, everything in `src/` gets
concatenated into one big JavaScript file, which is then
copy-pasted into the HTML. This approach might seem barbaric
if you're used to tools like Webpack or Browserify. But it
has advantages. The code builds very quickly, and your
source remains free of `import` boilerplate.

The downside of concatenating files is that you need
to take a little extra care to avoid order dependencies
between scripts. But this is no cause for alarm. In a
well-structured application files are naturally
order-independent.

If you want extra assurance that everything is going to be
okay, read on to learn about exactly how files are
concatenated.

### File concatenation order

To concatenate the files, ./build.sh recursively visits each
node of the file tree under `src/`, and `cat`s each
`.js` file it finds (ignoring files named `main.js`). At
each level of the tree, it fully explores all directories
before visiting files, and it visits both files and
directories in lexicographic order.

One way of controlling the concatenation order of files is
to number them with a fixed-length prefix (e.g. `0001`,
`0002`, etc.) but this is almost always overkill. The demo
project simply puts library files that must be loaded first
into a `src/_preamble` directory. The leading underscore
causes this directory to come before all directories
beginning with a lowercase letter.

Needless to say, you should strive to eliminate ordering
dependencies between your application's files. You can
do this by ensuring that your files contain only definitions
of functions and variables at the top level. It's only when
you start calling functions or accessing other variables in
top-level code that you run into ordering problems.
