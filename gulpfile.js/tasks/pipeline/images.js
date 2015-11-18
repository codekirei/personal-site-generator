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
function images() {
  return new P((res, rej) => {
    gulp.src(loc.src.img)
      .pipe(g.if(flags.watching, g.plumber()))
      .pipe(g.newer(loc.dist.img))
      .pipe(g.imagemin())
      .pipe(gulp.dest(loc.dist.img))
    res()
  })
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = images
// gulp.task(images)
