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
const postMeta = require('./modules/post-meta')
const main = require('./modules/main')
const footer = require('./modules/footer')
const script = require('./modules/script')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
const post = data => render(data, [head, body])

const body = data =>
  m('body'
    , { class: `body ${data.slug.split('/').pop()} has-banner`
      }
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
    , postMeta('banner')
    , bannerTags
    ]
  )(data)

const bannerTitle = data =>
  m('h1'
    , { class: 'banner__title' }
    , data.title
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

// author
//----------------------------------------------------------
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
        , helloButton
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

// hello button
//----------------------------------------------------------
const helloButton = data =>
  m('a'
    , { class: 'author__hello-button'
      , href: `mailto:${data.author.email}`
      }
    , [ buttonText()
      , buttonSvg()
      ])

const buttonText = () =>
  m('span'
    , { class: 'author__hello-button__text' }
    , 'say hello'
  )

const buttonSvg = () =>
  m('svg'
    , { class: 'author__hello-button__svg'
      , viewBox: '0 0 1024 1024'
      }
    , [ buttonPath() ])

const buttonPath = () =>
  m('path'
    , { d: 'M1024 405.714v453.714q0 37.714-26.857 64.571t-64.571 26.857h-841.143q-37.714 0-64.571-26.857t-26.857-64.571v-453.714q25.143 28 57.714 49.714 206.857 140.571 284 197.143 32.571 24 52.857 37.429t54 27.429 62.857 14h1.143q29.143 0 62.857-14t54-27.429 52.857-37.429q97.143-70.286 284.571-197.143 32.571-22.286 57.143-49.714zM1024 237.714q0 45.143-28 86.286t-69.714 70.286q-214.857 149.143-267.429 185.714-5.714 4-24.286 17.429t-30.857 21.714-29.714 18.571-32.857 15.429-28.571 5.143h-1.143q-13.143 0-28.571-5.143t-32.857-15.429-29.714-18.571-30.857-21.714-24.286-17.429q-52-36.571-149.714-104.286t-117.143-81.429q-35.429-24-66.857-66t-31.429-78q0-44.571 23.714-74.286t67.714-29.714h841.143q37.143 0 64.286 26.857t27.143 64.571z'
      })

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = post
