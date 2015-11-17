'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const gulp = require('gulp')
const g = require('gulp-load-plugins')()

// local
const watching = require('../../lib/watching')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function images() {
  const w = watching()
  const src = 'source/images/**/*.{jpg,png}'
  const dest = 'dist/img'
  return gulp.src(src)
    .pipe(g.if(w, g.plumber()))
    .pipe(g.newer(dest))
    .pipe(g.imagemin())
    .pipe(gulp.dest(dest))
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = images
gulp.task(images)
