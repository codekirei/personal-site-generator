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
// logic
//----------------------------------------------------------
function menuEvents() {
  // state vars
  //----------------------------------------------------------
  let directionToggle = true
  let shouldPreOpen = true
  let anims = {}
  let opacity = 0
  let windowW
  let bodyW
  let scrollW

  // relevant elements
  //----------------------------------------------------------
  const menuButton = getEl.withClass('menu-toggle')[0]
  const menu = getEl.withClass('menu')[0]
  const body = getEl.withTag('body')[0]
  const scrollDown = getEl.withClass('scroll-down')[0]
  const banner = getEl.withClass('index-banner')[0]

  // animation deltaFns and helpers
  //----------------------------------------------------------
  const fadeIn = (el, p) => el.style.opacity = opacity + p * (1 - opacity)
  const fadeOut = (el, p) => el.style.opacity = (1 - p) * opacity
  const animateMenu = (fn, cb) => animate(menu, fn, 322, ease.easeIn, cb)
  const stopAnims = () => Object.keys(anims).map(anim => anims[anim].stop())

  // scrollbar fns
  //----------------------------------------------------------
  function addMissingScrollbarStyles() {
    elst.add([body, banner], {paddingRight: `${scrollW}px`})
    elst.add(banner, {width: `${windowW}px`})
  }

  function delMissingScrollbarStyles() {
    elst.del(body, 'padding-right')
    elst.del(banner, ['width', 'padding-right'])
  }

  // BEM modifier class fns
  //----------------------------------------------------------
  function addModClasses() {
    elcl.add(menu, 'visible')
    elcl.add(body, 'no-scroll')
  }

  function delModClasses() {
    elcl.del(menu, 'visible')
    elcl.del(body, 'no-scroll')
  }

  // hacky test for mobile (feelsbadman)
  //----------------------------------------------------------
  const mobile = typeof window.orientation !== 'undefined'

  // modular listener fn for click
  //----------------------------------------------------------
  function preOpen() {
    addModClasses()
    if (!mobile) addMissingScrollbarStyles()
    shouldPreOpen = false
  }

  function postClose() {
    delModClasses()
    if (!mobile) delMissingScrollbarStyles()
    shouldPreOpen = true
  }

  function open() {
    if (shouldPreOpen) preOpen()
    anims.in = animateMenu(fadeIn)
  }

  const close = () => anims.out = animateMenu(fadeOut, postClose)

  function toggleMenu(e) {
    // don't follow href
    e.preventDefault()

    // if not at top scroll to top
    if (window.pageYOffset !== 0) window.scroll(0,0)

    // stop all running animations
    stopAnims()

    // store current menu opacity
    opacity = parseFloat(menu.style.opacity)

    // toggles
    directionToggle = !directionToggle
    elcl.toggle(menuButton, 'toggled')

    // open or close menu
    return directionToggle ? close() : open()
  }

  menuButton.addEventListener('click', toggleMenu)

  // initialize
  //----------------------------------------------------------
  function getWidths() {
    windowW = window.innerWidth
    bodyW = body.offsetWidth
    scrollW = windowW - bodyW
  }

  function lockPositions() {
    scrollDown.style.left = `${Math.round(bodyW / 2)}px`
  }

  function reset() {
    stopAnims()
    delModClasses()
    delMissingScrollbarStyles()

    // reset and bind opacity
    opacity = 0
    menu.style.opacity = opacity

    // reset toggles
    directionToggle = true
    shouldPreOpen = true
    elcl.del(menuButton, 'toggled')
  }

  function init() {
    reset()
    getWidths()
    lockPositions()
  }

  init()
  window.addEventListener('resize', init)
}

//----------------------------------------------------------
// export
//----------------------------------------------------------
export default domready(menuEvents)
