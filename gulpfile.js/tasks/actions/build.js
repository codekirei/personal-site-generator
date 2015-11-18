'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const gulp = require('gulp')
const P = require('bluebird')
const g = require('gulp-load-plugins')()

// local
const loc = require('conf/locations')
const flags = require('../../lib/flags')()
const dupes = require('../pipeline/dupes')
const images = require('../pipeline/images')
const jekyll = require('../pipeline/jekyll')
const scripts = require('../pipeline/scripts')
const styles = require('../pipeline/styles')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function watch() {
  g.watch(loc.src.dupes, dupes)
  g.watch(loc.src.img, images)
  g.watch(loc.src.markup, jekyll)
  g.watch(loc.src.scripts, scripts)
  g.watch(loc.src.stylesAll, styles)
}

function build() {
  if (flags.watching) watch()
  return P.all([
    dupes(),
    images(),
    jekyll(),
    scripts(),
    styles()
  ])
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = build
gulp.task(build)
