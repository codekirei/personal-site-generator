'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const gulp = require('gulp')
const P = require('bluebird')

// local
const dupes = require('../pipeline/dupes')
const images = require('../pipeline/images')
const jekyll = require('../pipeline/jekyll')
const scripts = require('../pipeline/scripts')
const styles = require('../pipeline/styles')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function build(cb) {
  return P.all([
    dupes(),
    images(),
    jekyll(),
    scripts(),
    styles()
  ]).then(() => cb())
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = build
gulp.task(build)
