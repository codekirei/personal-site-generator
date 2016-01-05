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
  m('h2'
    , { class: 'banner__subtitle' }
    , 'Clean design. Beautiful code.'
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
        , postDate
        , postPreview
        , postButton
        , postTags
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

const postDate = post =>
  m('p'
    , { class: 'post__date' }
    , [ m('span', 'posted:')
      , postTime(post)
      ])

const postTime = post =>
  m('time'
    , { class: 'post__time replace-time'
      , datetime: post.posted
      }
    , post.date
  )

const postPreview  = post =>
  m('div'
    , { class: 'post__preview' }
    , m.trust(post.preview)
  )

const postButton = post =>
  m('a'
    , { class: 'post__read-button'
      , href: post.slug
      }
    , 'read post'
  )

const postTags = post =>
  m('ul'
    , { class: 'post__tags' }
    , post.tags.map(postTag))

const postTag = tag =>
  m('li'
    , { class: 'post__tag' }
    , tag
  )

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = index
