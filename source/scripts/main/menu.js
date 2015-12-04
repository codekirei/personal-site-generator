//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
import getEl from 'get-element'
import domready from 'domready'
import ease from 'bezier-easing'

// local
import elcl from './element-class'
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
  let opacity

  // relevant elements
  //----------------------------------------------------------
  const menuButton = getEl.withClass('menu-toggle')[0]
  const menu = getEl.withClass('menu')[0]
  const body = getEl.withTag('body')[0]
  const scrollDown = getEl.withClass('scroll-down')[0]
  const banner = getEl.withClass('index-banner')[0]

  // width fns and vars
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

  // set initial opacity on menu to manipulate
  //----------------------------------------------------------
  menu.style.opacity = 0

  // animation deltaFns
  //----------------------------------------------------------
  const fadeIn = (el, p) => el.style.opacity = opacity + p * (1 - opacity)
  const fadeOut = (el, p) => el.style.opacity = (1 - p) * opacity

  // declare fns for listener cb
  //----------------------------------------------------------
  // shorthand for animate
  const a = (fn, cb) => animate(menu, fn, 644, ease.easeInOut, cb)

  function preOpen() {
    elcl.ensure(menu, 'visible')
    elcl.ensure(body, 'no-scroll')
    body.style.paddingRight = `${scrollW}px`
    banner.style.width = `${windowW}px`
    banner.style.paddingRight = `${scrollW}px`
  }

  function postClose() {
    elcl.toggle(menu, 'visible')
    elcl.toggle(body, 'no-scroll')
    body.style.removeProperty('padding-right')
    body.removeAttribute('style')
    banner.style.removeProperty('width')
    banner.style.removeProperty('padding-right')
    opening = false
  }

  function open() {
    if (!opening) preOpen()
    opening = true
    animations.in = a(fadeIn)
  }

  const close = () => animations.out = a(fadeOut, postClose)

  function toggleMenu(e) {
    e.preventDefault()
    directionToggle = !directionToggle
    Object.keys(animations).map(anim => animations[anim].stop())
    opacity = parseFloat(menu.style.opacity)
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
