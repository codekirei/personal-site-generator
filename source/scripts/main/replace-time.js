//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
import domready from 'domready'
import getEl from 'get-element'

//----------------------------------------------------------
// logic
//----------------------------------------------------------
const msToText = [
  [94608000001, 'over three years ago'],
  [94608000000, 'three years ago'],
  [63072000000, 'two years ago'],
  [31536000000, 'a year ago'],
  [28512000000, 'eleven months ago'],
  [25920000000, 'ten months ago'],
  [23328000000, 'nine months ago'],
  [20736000000, 'eight months ago'],
  [18144000000, 'seven months ago'],
  [15552000000, 'six months ago'],
  [12960000000, 'five months ago'],
  [10368000000, 'four months ago'],
  [7776000000, 'three months ago'],
  [5184000000, 'two months ago'],
  [2592000000, 'a month ago'],
  [1814400000, 'three weeks ago'],
  [1209600000, 'two weeks ago'],
  [604800000, 'a week ago'],
  [172800000, 'a few days ago'],
  [86400000, 'a day ago'],
  [7200000, 'a few hours ago'],
  [3600000, 'an hour ago'],
  [300000, 'a few minutes ago'],
  [0, 'just now']
]

// transform fns
//----------------------------------------------------------
const parse = el => Date.parse(el.getAttribute('datetime'))
const diff = (time, now) => now - time
function humanize(ms) {
  for (let pair of msToText) {
    if (ms > pair[0]) return pair[1]
  }
}

// main loop
//----------------------------------------------------------
function replaceTime() {
  const timeEls = getEl.withClass('replace-time')
  if (timeEls.length) {
    const now = Date.now()
    timeEls.map(el => [el, el])
      .map(el => [el[0], parse(el[1])])
      .map(el => [el[0], diff(el[1], now)])
      .map(el => [el[0], humanize(el[1])])
      .map(el => el[0].innerHTML = el[1])
  }
}

export default domready(replaceTime)
