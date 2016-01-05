'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const m = require('mithril')

// utils
const render = require('./utils/render')
const map = require('./utils/map')

// modules
const head = require('./modules/head')
const navToggle = require('./modules/nav-toggle')
const nav = require('./modules/nav')
const topbar = require('./modules/topbar')
const main = require('./modules/main')
const footer = require('./modules/footer')
const script = require('./modules/script')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
const page = data => render(data, [head, body])

const body = data =>
  m('body'
    , { class: `body ${data.slug.split('/').pop()} has-topbar` }
    , map(
        [ navToggle
        , nav
        , topbar
        , main(pageContent)
        , footer
        , script
        ]
      )(data))

const pageContent = data =>
  m('article'
    , { class: 'content'
      , role: 'article'
      }
    , m.trust(data.content)
  )

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = page
