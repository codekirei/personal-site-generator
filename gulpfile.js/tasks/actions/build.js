'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const gulp = require('gulp')
const runseq = require('run-sequence').use(gulp)

//----------------------------------------------------------
// exports
//----------------------------------------------------------
gulp.task('build', cb => {
  runseq(
    'jekyll',
    ['images', 'dupes', 'scriptImports', 'styles', 'fonts'],
    'scripts',
    () => cb()
  )
})
