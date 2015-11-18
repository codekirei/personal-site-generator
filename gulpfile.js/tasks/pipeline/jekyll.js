'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// node
const spawn = require('child_process').spawn
const P = require('bluebird')

// npm
const gulp = require('gulp')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function jekyll() {
  return new P((res, rej) => {
    return spawn(
      'jekyll', ['build', '--config', 'config/jekyll.yml']
    ).on('close', res)
  })
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = jekyll
// gulp.task(jekyll)
