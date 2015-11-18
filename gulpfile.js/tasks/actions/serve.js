'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const gulp = require('gulp')
const bs = require('browser-sync')

// local
const loc = require('conf/locations')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function serve() {
  bs.create('server').init({
    server: loc.dist.root
  })
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = serve
gulp.task('serve', serve)
