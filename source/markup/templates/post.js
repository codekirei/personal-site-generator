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
const post = data => render(data, [head, body])

const body = data =>
  m('body'
    , { class: `body ${data.slug.split('/').pop()} has-banner` }
    , map(
        [ navToggle
        , nav
        , banner(postBanner)
        , main(postContent)
        , footer
        , script
        ]
      )(data))

// banner
//----------------------------------------------------------
const postBanner = data =>
  map(
    [ bannerTitle
    , bannerTime
    , bannerTags
    ]
  )(data)

const bannerTitle = data =>
  m('h1'
    , { class: 'banner__title' }
    , data.title
  )

const bannerTime = data =>
  m('span'
    , { class: 'banner__time' }
    , map(
        [ bannerDate
        , bannerErt
        ]
      )(data))

const bannerDate = data =>
  m('time'
    , { class: 'banner__date replace-time'
      , datetime: data.posted
      }
    , `${data.date} &#x2014`
  )

const bannerErt = data =>
  m('span'
    , { class: 'banner__ert' }
    , `${data.ert} minute read`
  )

const bannerTags = data =>
  m('ul'
    , { class: 'banner__tags' }
    , data.tags.map(bannerTag))

const bannerTag = tag =>
  m('li'
    , { class: 'banner__tag' }
    , tag
  )

// content
//----------------------------------------------------------
const postContent = data => [article(data), author(data)]

const article = data =>
  m('article'
    , { class: 'content'
      , role: 'article'
      }
    , m.trust(data.content)
    , [ fleuron() ])

const fleuron = () =>
  m('img'
    , { class: 'fleuron'
      , src: '/img/kunai-fleuron.png'
      , alt: 'fleuron'
      })

const author = data =>
  m('section'
    , {class: 'author'}
    , [ authorImg()
      , authorInfo(data)
      ])

const authorImg = () =>
   m('img'
    , { class: 'author__img'
      , src: '/img/author.png'
      , alt: 'picture of author'
      })

const authorInfo = data =>
  m('div'
    , { class: 'author__info' }
    , map(
        [ authorTitle
        , authorName
        , authorHello
        ]
      )(data))

const authorTitle = () =>
  m('span'
    , { class: 'author__title' }
    , 'Author')

const authorName = data =>
  m('a'
    , { class: 'author__name' }
    , data.author.name)

const authorHello = data =>
  m('a'
    , { class: 'author__hello-button'
      , href: `mailto:${data.author.email}`
      }
    , 'say hello')

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = post
