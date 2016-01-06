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
const banner = require('./modules/banner')
const main = require('./modules/main')
const postMeta = require('./modules/post-meta')
const footer = require('./modules/footer')
const script = require('./modules/script')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
const index = data => render(data, [head, body])

const body = data =>
  m('body'
    , { class: 'body index has-banner' }
    , map(
        [ navToggle
        , nav
        , banner(indexBanner)
        , main(indexContent)
        , footer
        , script
        ]
      )(data))

// banner
//----------------------------------------------------------
const indexBanner = () =>
  [ bannerLogo()
  , bannerTitle()
  , bannerSubtitle()
  ]

const bannerLogo = () =>
  m('img'
    , { class: 'banner__logo'
      , src: '/img/kunai-logo.png'
      })

const bannerTitle = () =>
  m('h1'
    , { class: 'banner__title' }
    , 'Code Kirei'
  )

const bannerSubtitle = () =>
  m('div'
    , { class: 'banner__subtitles' }
    , [ m('h2', {class: 'banner__subtitle'}, 'Clean design.')
      , m('h2', {class: 'banner__subtitle'}, 'Beautiful code.')
      ]
  )

// content
//----------------------------------------------------------
const indexContent = data =>
  m('section'
    , { class: 'blog' }
    , data.posts.map(article))

const article = post =>
  m('article'
    , { class: 'post'
      , role: 'article'
      }
    , map(
        [ postTitle
        , postMeta('post')
        , postPreview
        , readButton
        ]
      )(post))

// post elements
//----------------------------------------------------------
const postTitle = post =>
  m('a'
    , { class: 'post__title'
      , href: post.slug
      }
    , [ m('h3', post.title) ])

const postPreview = post =>
  m('div'
    , { class: 'post__preview' }
    , m.trust(post.preview)
  )

// read button
//----------------------------------------------------------
const readButton = post =>
  m('a'
    , { class: 'post__read-button'
      , href: post.slug
      }
    , [ readButtonText()
      , readButtonSvg()
      ]
  )

const readButtonText = () =>
  m('span'
    , { class: 'post__read-button__text' }
    , 'read more'
  )

const readButtonSvg = () =>
  m('svg'
    , { class: 'post__read-button__svg'
      , viewBox: '0 0 366 1024'
      }
    , [ readButtonPath() ])

const readButtonPath = () =>
  m('path'
    , { d: 'M340 548.571q0 7.429-5.714 13.143l-266.286 266.286q-5.714 5.714-13.143 5.714t-13.143-5.714l-28.571-28.571q-5.714-5.714-5.714-13.143t5.714-13.143l224.571-224.571-224.571-224.571q-5.714-5.714-5.714-13.143t5.714-13.143l28.571-28.571q5.714-5.714 13.143-5.714t13.143 5.714l266.286 266.286q5.714 5.714 5.714 13.143z'
      })

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = index
