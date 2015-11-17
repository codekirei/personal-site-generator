'use strict'

/*
 * duplicate unchanged source files to dist
 */

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const gulp = require('gulp')
const P = require('bluebird')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function dupes() {
  return new P((res, rej) => {
    gulp.src('source/static/**/*')
      .pipe(gulp.dest('dist'))
    res()
  })

  // return gulp.src('source/static')
  //   .pipe(gulp.dest('dist'))
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = dupes
gulp.task(dupes)
