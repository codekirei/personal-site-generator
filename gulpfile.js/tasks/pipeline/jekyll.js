'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// node
const spawn = require('child_process').spawn

// npm
const gulp = require('gulp')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function jekyll(cb) {
  return spawn(
    'jekyll', ['build', '--config', 'config/jekyll.yml']
  ).on('close', cb)
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = jekyll
gulp.task('jekyll', jekyll)
