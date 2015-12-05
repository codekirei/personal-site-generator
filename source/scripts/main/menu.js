//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
import getEl from 'get-element'
import domready from 'domready'
import ease from 'bezier-easing'

// local
import elcl from './element-class'
import elst from './element-style'
import {animate} from './animate'

//----------------------------------------------------------
// main loop
//----------------------------------------------------------
function menuEvents() {
  // state vars
  //----------------------------------------------------------
  let directionToggle = true
  let shouldPreOpen = true
  let animations = {}
  let opacity = 0

  // relevant elements
  //----------------------------------------------------------
  const menuButton = getEl.withClass('menu-toggle')[0]
  const menu = getEl.withClass('menu')[0]
  const body = getEl.withTag('body')[0]
  const scrollDown = getEl.withClass('scroll-down')[0]
  const banner = getEl.withClass('index-banner')[0]

  // resize events
  //----------------------------------------------------------
  let windowW
  let bodyW
  let scrollW

  function getWidths() {
    windowW = window.innerWidth
    bodyW = document.body.clientWidth
    scrollW = windowW - bodyW
  }

  function fixPositions() {
    scrollDown.style.left = `${Math.round(bodyW / 2)}px`
  }

  function resizeEvents() {
    getWidths()
    fixPositions()
  }

  resizeEvents()
  window.addEventListener('resize', resizeEvents)

  // set menu opacity to manipulate with js
  //----------------------------------------------------------
  menu.style.opacity = opacity

  // hacky test for mobile because they have clear scrollbars (feelsbadman)
  //----------------------------------------------------------
  const mobile = typeof window.orientation !== 'undefined'

  // animation deltaFns
  //----------------------------------------------------------
  const fadeIn = (el, p) => el.style.opacity = opacity + p * (1 - opacity)
  const fadeOut = (el, p) => el.style.opacity = (1 - p) * opacity

  // declare fns for listener cb
  //----------------------------------------------------------
  // shorthand for animations
  const a = (fn, cb) => animate(menu, fn, 322, ease.easeIn, cb)

  function preOpen() {
    // add --state styles
    elcl.ensure(menu, 'visible')
    elcl.ensure(body, 'no-scroll')

    // account for scrollbar disappearing
    if (!mobile) {
      elst.add([body, banner], {paddingRight: `${scrollW}px`})
      elst.add(banner, {width: `${windowW}px`})
    }

    // toggle
    shouldPreOpen = false
  }

  function postClose() {
    // remove --state styles
    elcl.toggle(menu, 'visible')
    elcl.toggle(body, 'no-scroll')

    // account for scrollbar reappearing
    if (!mobile) {
      elst.del(body, 'padding-right')
      elst.del(banner, ['width', 'padding-right'])
    }

    // toggle
    shouldPreOpen = true
  }

  function open() {
    if (shouldPreOpen) preOpen()
    animations.in = a(fadeIn)
  }

  const close = () => animations.out = a(fadeOut, postClose)

  function toggleMenu(e) {
    // don't follow href
    e.preventDefault()

    // scroll to top if not there already
    if (window.pageYOffset !== 0) window.scroll(0,0)

    // stop all running animations
    Object.keys(animations).map(anim => animations[anim].stop())

    // store current menu opacity
    opacity = parseFloat(menu.style.opacity)

    // toggles
    directionToggle = !directionToggle
    elcl.toggle(menuButton, 'toggled')

    // open or close menu
    return directionToggle ? close() : open()
  }

  // attach listener
  //----------------------------------------------------------
  menuButton.addEventListener('click', toggleMenu)
}

//----------------------------------------------------------
// export
//----------------------------------------------------------
export default domready(menuEvents)
