'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const gulp = require('gulp')
const g = require('gulp-load-plugins')()
const webpack = require('webpack')
const merge = require('lodash.merge')

// local
const flags = require('../../lib/flags')()
let conf = require('conf/webpack')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function scripts(cb) {
  if (flags.dist) conf = merge(conf, conf.dist)
  webpack(conf, (err, res) => {
    if (err) throw new g.util.PluginError('webpack', err)
    g.util.log('[webpack]', res.toString())
    cb()
  })
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = scripts
gulp.task('scripts', scripts)
