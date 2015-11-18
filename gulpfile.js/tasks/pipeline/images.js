'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const gulp = require('gulp')
const P = require('bluebird')
const g = require('gulp-load-plugins')()

// local
const watching = require('../../lib/watching')
const loc = require('conf/locations')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function images() {
  return new P((res, rej) => {
    const w = watching()
    gulp.src(loc.src.img)
      .pipe(g.if(w, g.plumber()))
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
gulp.task(images)
