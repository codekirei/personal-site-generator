'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const gulp = require('gulp')
const g = require('gulp-load-plugins')()
const P = require('bluebird')
const koutoSwiss = require('kouto-swiss')
const jeet = require('jeet')
const rupture = require('rupture')

// local
const watching = require('../../lib/watching')()
const loc = require('conf/location')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function styles() {
  return new P((res, rej) => {
    gulp.src(loc.src.styles)
      .pipe(g.if(watching, g.plumber()))
      .pipe(g.stylus({
        use: [koutoSwiss(), jeet(), rupture()]
      }))
      .pipe(g.autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(g.rename('style.css'))
      .pipe(gulp.dest(loc.dist.code))
    res()
  })
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = styles
gulp.task(styles)
