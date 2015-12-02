'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const gulp = require('gulp')
const bs = require('browser-sync')
const g = require('gulp-load-plugins')()
const runseq = require('run-sequence').use(gulp)

// local
const loc = require('conf/locations')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function reload(glob) {
  return glob
    ? bs.get('server').reload(glob)
    : bs.get('server').reload()
}

function watch() {
  // jekyll
  g.watch([loc.src.markup, loc.cfg.jekyll], () => runseq(
    'build',
    () => reload()
  ))

  // dupes
  g.watch(loc.src.dupes, () => runseq(
    'dupes',
    () => reload()
  ))

  // img
  g.watch(loc.src.img, () => runseq(
    'images',
    () => reload()
  ))

  // scripts
  gulp.watch(loc.src.scriptModules, ['scriptImports'])
  g.watch(loc.src.scriptEntries, () => runseq(
    'scripts',
    () => reload('*.js')
  ))

  // styles
  g.watch(loc.src.stylesAll, () => runseq(
    'styles',
    () => reload('style.css')
  ))

  // fonts
  g.watch(loc.src.fonts, () => runseq(
    'fonts',
    () => reload()
  ))
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = watch
gulp.task('watch', ['build', 'serve'], watch)
