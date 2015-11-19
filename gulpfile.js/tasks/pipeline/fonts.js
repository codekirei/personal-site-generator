'use strict'

/*
 * duplicate fonts into dist
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
function fonts() {
  return gulp.src(loc.src.fonts)
    .pipe(gulp.dest(loc.dist.fonts))
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = fonts
gulp.task('fonts', fonts)
