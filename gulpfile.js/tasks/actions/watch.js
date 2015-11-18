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
function watch() {
  // gulp.watch(loc.src.markup, ['jekyll'], () => bs.get('serverA').reload())
  // gulp.watch(loc.src.markup, () => runseq('jekyll', 'reload'))
  // gulp.watch(loc.dist.root + '**/*').on('change', bs.get('server').reload)
  g.watch(loc.src.markup, () => runseq('build', 'reload'))
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = watch
gulp.task('watch', ['build', 'serve'], watch)
