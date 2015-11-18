const p = require('path')

module.exports = {
  // source locations
  src: {
    root: 'source'
    , get dupes() {return p.join(this.root, 'static/**/*')}
    , get img() {return p.join(this.root, 'images/**/*.{jpg,png}')}
    , get scripts() {return p.join(this.root, 'scripts/**/*.js')}
    , get styles() {return p.join(this.root, 'styles/main.styl')}
  },

  // dist locations
  dist: {
    root: 'dist'
    , get clean() {return p.join(this.root, '**/*')}
    , get img() {return p.join(this.root, 'img')}
    , get code() {return p.join(this.root, 'code')}
  }
}

/* eslint comma-style: [0] */
