'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const m = require('mithril')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
const topbar = data =>
  m('header'
    , { class: 'topbar'
      , role: 'heading'
      }
    , [ topbarContent(data) ])

const topbarContent = data =>
  m('div'
    , { class: 'topbar__content' }
    , [ topbarTitle(data) ])

const topbarTitle = data =>
  m('h1'
    , { class: 'topbar__title' }
    , data.title
  )

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = topbar
