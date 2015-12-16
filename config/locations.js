'use strict'

const p = require('path')
const globby = require('globby')
const proc = require('process')

const locations = module.exports = {
  // absolute path to project root (assuming gulp calls webpack)
  get abs() {return proc.cwd()}

  // source locations
  , src: {
    root: 'source'
    // scripts
    , get scripts() {return p.join(locations.abs, this.root, 'scripts')}
    , get scriptModules() {return p.join(this.root, 'scripts/*/**/*.js')}
    , get scriptEntries() {return p.join(this.root, 'scripts/*.js')}
    // static
    , get dupes() {return p.join(this.root, 'static/**/*')}
    // images
    , get img() {return p.join(this.root, 'images/**/*.{jpg,png}')}
    // styles
    , get styles() {return p.join(this.root, 'styles/index.styl')}
    , get stylesAll() {return p.join(this.root, 'styles/**/*.styl')}
    // markup
    , get pages() {return p.join(this.root, 'markup/content/*.md')}
    , get posts() {return p.join(this.root, 'markup/content/posts/*.md')}
    , get templates() {return p.join(this.root, 'markup/templates/*.jade')}
    , get markup() {return p.join(this.root, 'markup/**/*.{md|jade}')}
    , get jadeBase() {return p.join(this.root, 'markup/templates')}
    // fonts
    , get fonts() {return p.join(this.root, 'fonts/**/*')}
  }

  // dist locations
  , dist: {
    root: 'dist'
    , get clean() {return p.join(this.root, '**/*')}
    , get img() {return p.join(this.root, 'img')}
    , get code() {return p.join(this.root, 'code')}
    , get scripts() {return p.join(locations.abs, this.code)}
    , get fonts() {return p.join(this.root, 'fonts')}
  }

  // config locations (so meta)
  , cfg: {
    root: 'config'
    , get jekyll() {return p.join(this.root, 'jekyll.yml')}
    , get locations() {return p.join(this.root, 'locations.js')}
  }
}

/* eslint comma-style: [0] */
