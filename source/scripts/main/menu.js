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
  let opening = false
  let animations = {}

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
  let opacity
  // let top

  function getWidths() {
    windowW = window.innerWidth
    bodyW = document.body.clientWidth
    scrollW = windowW - bodyW
  }

  function fixPositions() {
    scrollDown.style.left = `${Math.round(bodyW / 2)}px`
  }

  // function readStyles() {
    // opacity = parseFloat(window.getComputedStyle(menu).opacity)
    // menu.style.opacity = opacity
    // top = parseInt(window.getComputedStyle(menuButton).top)
    // menuButton.style.top = `${top}px`
  // }

  function resizeEvents() {
    getWidths()
    fixPositions()
    // readStyles()
  }

  resizeEvents()
  window.addEventListener('resize', resizeEvents)

  // set menu opacity to manipulate with js
  //----------------------------------------------------------
  menu.style.opacity = 0

  // hacky test for mobile
  //----------------------------------------------------------
  const mobile = typeof window.orientation !== 'undefined'

  // animation deltaFns
  //----------------------------------------------------------
  const fadeIn = (el, p) => el.style.opacity = opacity + p * (1 - opacity)
  const fadeOut = (el, p) => el.style.opacity = (1 - p) * opacity
  // const moveUp = (el , p) => el.style.top = `${top - p * window.pageYOffset}px`
  // const moveDown = (el, p) => el.style.top = `${top + p * window.pageYOffset}px`

  // declare fns for listener cb
  //----------------------------------------------------------
  // shorthand for animations
  const aM = (fn, cb) => animate(menu, fn, 322, ease.easeIn, cb)
  // const aB = (fn, cb) => animate(menuButton, fn, 322, ease.easeIn, cb)

  function preOpen() {
    elcl.ensure(menu, 'visible')
    elcl.ensure(body, 'no-scroll')
    if (!mobile) {
      elst.add([body, banner], {paddingRight: `${scrollW}px`})
      elst.add(banner, {width: `${windowW}px`})
    }
    opening = true
  }

  function postClose() {
    elcl.toggle(menu, 'visible')
    elcl.toggle(body, 'no-scroll')
    if (!mobile) {
      elst.del(body, 'padding-right')
      elst.del(banner, ['width', 'padding-right'])
    }
    opening = false
  }

  function open() {
    if (!opening) preOpen()
    // if (window.pageYOffset !== 0) animations.down = aB(moveDown)
    animations.in = aM(fadeIn)
  }

  function close() {
    // if (window.pageYOffset !== 0) animations.up = aB(moveUp)
    animations.out = aM(fadeOut, postClose)
  }

  function toggleMenu(e) {
    e.preventDefault()
    directionToggle = !directionToggle
    Object.keys(animations).map(anim => animations[anim].stop())
    opacity = parseFloat(menu.style.opacity)
    // top = parseInt(menuButton.style.top)
    elcl.toggle(menuButton, 'toggled')
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
