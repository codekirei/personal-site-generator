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

// function topbar(data) {
//   const header =
//     m('header'
//       , { class: 'topbar'
//         , role: 'heading'
//         }
//       , [ content ])

//   const content =
//     m('div'
//       , { class: 'topbar__content' }
//       , [ title(data) ])

//   const title = data =>
//     m('h1'
//       , { class: 'topbar__title' }
//       , data.title
//     )

//   return header
// }

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = topbar
