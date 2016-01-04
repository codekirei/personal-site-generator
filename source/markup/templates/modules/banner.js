'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const m = require('mithril')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
const banner = content =>
  m('header'
    , { class: 'banner'
      , role: 'banner'
      }
    , [ bannerContent(content)
      , scrollDown
      ])

// bannerContent
//----------------------------------------------------------
const bannerContent = content =>
  m('div'
    , { class: 'banner__content' }
    , content)

// scrollDown
//----------------------------------------------------------
const scrollDown =
  m('a'
    , { class: 'scroll-down'
      , href: '#scroll-down-target'
      , role: 'button'
      , dataScroll: true // or 'data-scroll' ?
      }
    , [ svg ])

const svg =
  m('svg'
    , { class: 'scroll-down__svg'
      , viewBox: '0 0 658 1024'
      }
    , [ path ])

const path =
  m('path'
    , { d: 'M614.286 420.571q0 7.429-5.714 13.143l-266.286 266.286q-5.714 5.714-13.143 5.714t-13.143-5.714l-266.286-266.286q-5.714-5.714-5.714-13.143t5.714-13.143l28.571-28.571q5.714-5.714 13.143-5.714t13.143 5.714l224.571 224.571 224.571-224.571q5.714-5.714 13.143-5.714t13.143 5.714l28.571 28.571q5.714 5.714 5.714 13.143z'
    })

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = banner
