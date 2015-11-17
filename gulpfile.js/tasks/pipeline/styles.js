'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const gulp = require('gulp')
const g = require('gulp-load-plugins')()
const koutoSwiss = require('kouto-swiss')
const jeet = require('jeet')
const rupture = require('rupture')

// local
const w = require('../../lib/watching')()

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function styles() {
  return gulp.src('source/styles/main.styl')
    .pipe(g.if(w, g.plumber()))
    .pipe(g.stylus({
      use: [koutoSwiss(), jeet(), rupture()]
    }))
    .pipe(g.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(g.rename('style.css'))
    .pipe(gulp.dest('dist/code'))
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = styles
gulp.task(styles)
