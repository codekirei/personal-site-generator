'use strict'

/*
 * remove contents of /dist
 */

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const gulp = require('gulp')
const del = require('del')
const P = require('bluebird')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function clean() {
  return new P((res, rej) => {
    return del(['dist/**/*', '!.git'])
      .then(() => res())
  })
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = clean
gulp.task(clean)
