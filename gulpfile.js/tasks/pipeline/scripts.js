'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const gulp = require('gulp')
const P = require('bluebird')
const g = require('gulp-load-plugins')()

// local
const flags = require('../../lib/flags')()
const loc = require('conf/locations')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function scripts() {
  return new P((res, rej) => {
    gulp.src(loc.src.scripts)
      .pipe(g.if(flags.watching, g.plumber()))
      .pipe(g.concat('main.js'))
      .pipe(g.uglify())
      .pipe(gulp.dest(loc.dist.code))
    res()
  })
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = scripts
// gulp.task(scripts)
