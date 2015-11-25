'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const gulp = require('gulp')
const bs = require('browser-sync')
const g = require('gulp-load-plugins')()
const runseq = require('run-sequence').use(gulp)
const webpack = require('webpack')

// local
const loc = require('conf/locations')
const webpackConf = require('conf/webpack')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function reload(glob) {
  return glob
    ? bs.get('server').reload(glob)
    : bs.get('server').reload()
}

function watch() {
  // jekyll
  g.watch([loc.src.markup, loc.cfg.jekyll], () => runseq(
    'build',
    () => reload()
  ))

  // dupes
  g.watch(loc.src.dupes, () => runseq(
    'dupes',
    () => reload()
  ))

  // img
  g.watch(loc.src.img, () => runseq(
    'images',
    () => reload()
  ))

  // scripts
  webpack(webpackConf).watch(200, (err, res) => {
    if (err) throw new g.util.PluginError('webpack', err)
    g.util.log('[webpack]', res.toString())
    reload('*.js')
  })

  // styles
  g.watch(loc.src.stylesAll, () => runseq(
    'styles',
    () => reload('style.css')
  ))

  // fonts
  g.watch(loc.src.fonts, () => runseq(
    'fonts',
    () => reload()
  ))
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = watch
gulp.task('watch', ['build', 'serve'], watch)
