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

// local
const loc = require('conf/locations')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function dupes() {
  return new P((res, rej) => {
    gulp.src(loc.src.dupes)
      .pipe(gulp.dest(loc.dist.root))
    res()
  })
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = dupes
gulp.task(dupes)
