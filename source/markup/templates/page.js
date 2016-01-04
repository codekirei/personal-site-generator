'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const m = require('mithril')

// local
const render = require('./utils/render')
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
    , { class: `${data.slug.split('/').pop()} has-topbar` }
    , [ navToggle
      , nav(data)
      , topbar(data)
      , main(pageContent(data))
      , footer(data)
      , script
      ])

const pageContent = data =>
  m('article'
    , { class: content
      , role: 'article'
      }
    , m.trust(data.content)
  )

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = page
