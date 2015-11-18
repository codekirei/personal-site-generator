'use strict'

/*
 * duplicate unchanged source files to dist
 */

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const gulp = require('gulp')

// local
const loc = require('conf/locations')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function duplicate() {
  return gulp.src(loc.src.dupes)
    .pipe(gulp.dest(loc.dist.root))
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = duplicate
gulp.task('dupes', duplicate)
