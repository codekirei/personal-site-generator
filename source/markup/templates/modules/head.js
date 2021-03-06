'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const m = require('mithril')

// local
const flatAr = require('../utils/flat-ar')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
const head = data =>
  m('head'
    , flatAr(
        [ charset()
        , viewport()
        , title(data)
        , link('canonical', data.canonical)
        , link('author', data.author.link)
        , link('stylesheet', '/code/style.css')
        , meta('description', data.description)
        , meta('msapplication-TileColor', '#FFFFFF')
        , meta('msapplication-TileImage', '/favicon-144.png')
        , favicons([180, 152, 120, 76])
        ]))

const charset = () => m('meta', { charset: 'utf-8' })

const viewport = () =>
  m('meta'
    , { name: 'viewport'
      , content: 'width=device-width, initial-scale=1'
      })

const title = data => m('title', data.title)

const link = (rel, href) => m('link', {rel, href})

const meta = (name, content) => m('meta', {name, content})

const favicons = sizes => sizes.map(favicon)

const favicon = size =>
  m('link'
    , { rel: 'apple-touch-icon-precomposed'
      , sizes: `${size}x${size}`
      , href: `/favicon-${size}.png`
      })

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = head
