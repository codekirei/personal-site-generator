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

// local
const loc = require('conf/locations')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function clean() {
  return del([loc.dist.clean, '!.git'])
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = clean
gulp.task('clean', clean)
