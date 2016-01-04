'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const m = require('mithril')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
const nav = data =>
  m('nav'
    , { class: 'menu'
      , role: 'navigation'
      }
    , [ navList(data) ])

const navList = data =>
  m('ul'
    , { class: 'menu__list' }
    , data.nav.map(navItem))

const navItem = link =>
  m('li'
    , { class: 'menu__item' }
    , [ navLink(link) ])

const navLink = link =>
  m('a'
    , { class: 'menu__link'
      , href: link.link
      }
    , link.text
  )

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = nav
