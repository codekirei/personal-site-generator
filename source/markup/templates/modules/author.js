'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const m = require('mithril')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
const author = data =>
  m('section'
    , {class: 'author'}
    , [ authorImg
      , authorInfo(data)
      ])

// authorImg
//----------------------------------------------------------
const authorImg =
   m('img'
    , { class: 'author__img'
      , src: '/img/author.png'
      , alt: 'picture of author'
      })

// authorInfo
//----------------------------------------------------------
const authorInfo = data =>
  m('div'
    , {class: 'author__info'}
    , [ authorTitle
      , authorName(data)
      , authorHello(data)
      ])

const authorTitle =
   m('span'
    , {class: 'author__title'}
    , 'Author')

const authorName = data =>
  m('a'
    , {class: 'author__name'}
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
module.exports = author
