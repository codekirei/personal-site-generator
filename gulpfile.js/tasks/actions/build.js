'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const gulp = require('gulp')
const bs = require('browser-sync').get('server')
const g = require('gulp-load-plugins')()

// local
const flags = require('../../lib/flags')
const loc = require('conf/locations')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function watch() {
  if (flag.watching) {
    g.watch(loc.src.markup, ['jekyll'], () => bs.reload())
  }
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
gulp.task('build', ['static', 'images', 'jekyll', 'scripts', 'styles'])
