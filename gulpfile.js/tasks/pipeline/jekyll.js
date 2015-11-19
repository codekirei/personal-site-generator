'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// node
const spawn = require('child_process').spawn
const bs = require('browser-sync')

// npm
const gulp = require('gulp')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function jekyll(cb) {
  const process = spawn(
    'jekyll', ['build', '--config', 'config/jekyll.yml']
  )
  process.stderr.on('data', data => console.log(data.toString()))
  process.on('close', cb)
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = jekyll
gulp.task('jekyll', jekyll)
gulp.task('jekyll-rebuild', ['jekyll'], () => bs.get('server').reload())
