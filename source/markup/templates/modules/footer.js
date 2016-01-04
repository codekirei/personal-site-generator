'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const m = require('mithril')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
const footer = data =>
  m('footer'
    , { class: 'site-footer' }
    , [ footerContent(data) ]
    )

const footerContent = data =>
  m('div'
    , { class: 'site-footer__content' }
    , [ footerNav(data)
      , footerDivider
      , footerInfo
      ])

const footerDivider =
  m('hr'
    , { class: 'site-footer__divider' })

// footerNav
//----------------------------------------------------------
const footerNav = data =>
  m('nav'
    , { class: 'footer-nav'
      , id: 'footer-nav'
      , role: 'navigation'
      }
    , [ navList(data) ])

const navList = data =>
  m('ul'
    , { class: 'footer-nav__list' }
    , data.nav.map(navItem))

const navItem = link =>
  m('li'
    , { class: 'footer-nav__item' }
    , [ navLink(link) ])

const navLink = link =>
  m('a'
    , { class: 'footer-nav__link'
      , href: link.link
      }
    , link.text
    )

// footerInfo
//----------------------------------------------------------
const footerInfo =
  m('a'
    , { class: 'site-footer__info'
      , href: '/colophon'
      , role: 'button'
      , ariaLabel: 'About the site'
      }
    , [ svg ])

const svg =
  m('svg'
    , { class: 'site-footer__info-svg'
      , viewBox: '0 0 877.7142857142858 1024'
      }
    , [ path ])

const path =
  m('path'
    , { d: 'M585.143 786.286v-91.429q0-8-5.143-13.143t-13.143-5.143h-54.857v-292.571q0-8-5.143-13.143t-13.143-5.143h-182.857q-8 0-13.143 5.143t-5.143 13.143v91.429q0 8 5.143 13.143t13.143 5.143h54.857v182.857h-54.857q-8 0-13.143 5.143t-5.143 13.143v91.429q0 8 5.143 13.143t13.143 5.143h256q8 0 13.143-5.143t5.143-13.143zM512 274.286v-91.429q0-8-5.143-13.143t-13.143-5.143h-109.714q-8 0-13.143 5.143t-5.143 13.143v91.429q0 8 5.143 13.143t13.143 5.143h109.714q8 0 13.143-5.143t5.143-13.143zM877.714 512q0 119.429-58.857 220.286t-159.714 159.714-220.286 58.857-220.286-58.857-159.714-159.714-58.857-220.286 58.857-220.286 159.714-159.714 220.286-58.857 220.286 58.857 159.714 159.714 58.857 220.286z'
      })

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = footer
