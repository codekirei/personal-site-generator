---
template: page
title: My Projects
description: Some things I've made
slug: /projects
---

## Stable

These projects have complete documentation and test coverage and are not likely to see drastic changes or code churn in the near future.

- `auto-import` [source](https://github.com/codekirei/auto-import)

A Node.js module that automatically builds an index file filled with `import` statements to every module in a directory. This enables workflow nirvana with my typical gulp and webpack configs for frontend dev work &mdash; I simply add or remove modules in my scripts dir, and everything just works.

- `get-element` [source](https://github.com/codekirei/get-element)

A browser-focused JS module for quickly selecting elements by tag or class. Basically syntactic sugar for approximately this:

```js
Array.prototype.slice.call(document.getElementsByClassName('exampleClass'))
```
It's fast, it's tiny, and it gives you an array to work with instead of an HTMLCollection. Meant to be bundled up with something like Webpack or Browserify, but I've included a self-executing browser build too, just in case.

- `gulp-regex-rename` [source](https://github.com/codekirei/gulp-regex-rename)

A gulp plugin that renames files by matching a regex, because everyone loves regexes! Functions just fine when the replacement string is empty, so you can remove a substring as well (e.g., `index.es6.js` -> `index.js`).

- `hanging-indent` [source](https://github.com/codekirei/hanging-indent)

A Node.js module for intelligently adding a hanging indent to a string. Configurable indent and line lengths.

- `node-multispinner` [source](https://github.com/codekirei/node-multispinner)

One of my favorites! A Node.js module for simultaneously instantiating and controlling multiple ASCII loading spinners in the console. Potentially very useful for CLI applications that queue multiple simultaneous tasks with varying completion times. Definitely give this one a pull and check out the examples!

- `type-iterator` [source](https://github.com/codekirei/type-iterator)

A Node.js module for running a callback against multiple JS types easily. Supports `undefined`, `null`, `String`, `Boolean`, `Number`, `Function`, `Array`, and `Object`. Potentially very useful for writing test functions.

- `yaml-fm` [source](https://github.com/codekirei/yaml-fm)

A Node.js module for YAML frontmatter parsing. Lightweight but powerful. I use it in my [static markup generator](https://github.com/codekirei/smg).

## Work In Progress

These projects are in varying stages of completion, but I'm excited enough about them that they'll likely move up into the stable category fairly soon.

- `hari` [source](https://github.com/codekirei/hari)

Another one of my favorites! A Node.js module for watching files and automatically running a script in response. Clears term in between runs. Also pretty prints some fun metadata before the script results, like how long the script has been running and how many times it has been re-run this session. Intended for use in development to re-run something you want updated output from regularly, like a test suite. It's more configurable than the standalone `-w` or `--watch` built into a lot of scripts these days.

- `parse-terminfo` [source](https://github.com/codekirei/parse-terminfo)

Very early concept of a standalone terminfo parser in Node.js. Right now it just reads `infocmp`, but eventually this will manually process the actual terminfo file. Inspired by the parser in [chjj](https://twitter.com/_chjj)'s monolithic [blessed](https://github.com/chjj/blessed) library.

- `smg` [source](https://github.com/codekirei/smg)

A Node.js static-markup-generator. The idea behind this module is that I love static-site-generators, but my modern CSS and JS tooling and workflows don't. This module only cares about markup &mdash; markdown content with YAML frontmatter, and a templating solution. That means it plays nice with Gulp / Grunt / Fly / Browserify / Webpack / Babel / Stylus / Sass / Whatever, because those things aren't markup. Still hashing out some of the details with templating, but I did use this module to build this site, so it's coming along!

## Ongoing

These are "living" projects that I expect to continually evolve over time.

- `dotfiles` [source](https://github.com/codekirei/dotfiles)

My dotfiles repo! It's currently Ansible powered and thus idempotent. Targets a unix-based dev box with `XDG_CONFIG` support. Creates lots of symlinks. Needs some serious love. I'll get around to it... eventually!

- `codekirei.com` [source](https://github.com/codekirei/codekirei.github.io)

The custom static-site-generator powering this site. Uses a lot of open-source tech like [Gulp](http://gulpjs.com/), [Stylus](http://stylus-lang.com/), [Babel](https://babeljs.io/), [Mithril](http://mithril.js.org/), [webpack](http://webpack.github.io/), and my very own [smg](https://github.com/codekirei/smg). Check out the [colophon](/colophon) for a more detailed breakdown.
