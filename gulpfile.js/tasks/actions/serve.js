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
    server: loc.dist.root,
    open: false
  })
}

function reload() {
  bs.get('server').reload()
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = serve
gulp.task('serve', ['build'], serve)
gulp.task('reload', reload)
