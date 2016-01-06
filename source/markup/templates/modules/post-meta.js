'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const m = require('mithril')

// local
const map = require('../utils/map')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
const postMeta = scope => data =>
  m('span'
    , { class: `${scope}__meta` }
    , map(map([date, dash, ert])(scope))(data))

const date = scope => data =>
  m('time'
    , { class: `${scope}__date replace-time`
      , datetime: data.posted
      }
    , data.date
  )

const dash = scope => () =>
  m('span'
    , { class: `${scope}__dash` }
    , m.trust(' &mdash; ')
  )

const ert = scope => data =>
  m('span'
    , { class: `${scope}__ert` }
    , `${data.ert} minute read`
  )

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = postMeta
