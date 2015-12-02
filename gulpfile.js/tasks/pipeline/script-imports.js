'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const gulp = require('gulp')
const autoImport = require('auto-import')

// local
const loc = require('conf/locations')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function scriptImports() {
  autoImport(loc.src.scripts, 'vendor')
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = scriptImports
gulp.task('scriptImports', scriptImports)
