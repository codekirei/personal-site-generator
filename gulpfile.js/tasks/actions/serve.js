'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const gulp = require('gulp')
const browserSync = require('browser-sync')

// local
const loc = require('conf/locations')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function serve() {
  browserSync({
    server: {
      baseDir: loc.dist.root
    }
  })
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = serve
gulp.task(serve)
