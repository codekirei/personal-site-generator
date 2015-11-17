'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const gulp = require('gulp')
const g = require('gulp-load-plugins')()

// local
const w = require('../../lib/watching')()

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function scripts() {
  return gulp.src('source/scripts/**/*.js')
    .pipe(g.if(w, g.plumber()))
    .pipe(g.concat('main.js'))
    .pipe(g.uglify())
    .pipe(gulp.dest('dist/code'))
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = scripts
gulp.task(scripts)
