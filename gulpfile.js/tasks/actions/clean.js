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

// local
const loc = require('conf/locations')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function clean() {
  return new P((res, rej) => {
    return del([loc.dist.clean, '!.git'])
      .then(() => res())
  })
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = clean
gulp.task(clean)
