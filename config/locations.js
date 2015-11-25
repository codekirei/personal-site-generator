'use strict'

const p = require('path')

const locations = module.exports = {
  // source locations
  src: {
    root: 'source'
    , scripts: {
      get blocking() {
        return p.join(locations.src.root, 'scripts/blocking/**/*.js')
      }
      , get main() {return p.join(locations.src.root, 'scripts/main/**/*.js')}
    }
    , get dupes() {return p.join(this.root, 'static/**/*')}
    , get img() {return p.join(this.root, 'images/**/*.{jpg,png}')}
    , get styles() {return p.join(this.root, 'styles/index.styl')}
    , get stylesAll() {return p.join(this.root, 'styles/**/*.styl')}
    , get markup() {return p.join(this.root, 'markup/**/*')}
    , get fonts() {return p.join(this.root, 'fonts/**/*')}
  },

  // dist locations
  dist: {
    root: 'dist'
    , get clean() {return p.join(this.root, '**/*')}
    , get img() {return p.join(this.root, 'img')}
    , get code() {return p.join(this.root, 'code')}
    , get fonts() {return p.join(this.root, 'fonts')}
  },

  // config locations (so meta)
  cfg: {
    root: 'config'
    , get jekyll() {return p.join(this.root, 'jekyll.yml')}
    , get locations() {return p.join(this.root, 'locations.js')}
  }
}

/* eslint comma-style: [0] */
