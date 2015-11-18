'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// node
const p = require('path')

// npm
const gulp = require('gulp')
const bs = require('browser-sync').create('server')

// local
const loc = require('conf/locations')
const flags = require('../../lib/flags')()

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function serve() {
  bs.init({
    server: loc.dist.root
  })
  // browserSync({
  //   server: {
  //     baseDir: loc.dist.root
  //   }
  // })
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = serve
// gulp.task(serve)
