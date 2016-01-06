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
  let opacity = 0
  let anim, windowW, bodyW, scrollW

  // relevant elements
  //----------------------------------------------------------
  const menuButton = getEl.withClass('menu-toggle')[0]
  const menu = getEl.withClass('menu')[0]
  const body = getEl.withTag('body')[0]
  const scrollDown = getEl.withClass('scroll-down')[0]
  const banner = getEl.withClass('banner')[0]
  const footer = getEl.withClass('site-footer')[0]

  // animation deltaFns and helpers
  //----------------------------------------------------------
  const fadeIn = (el, p) => el.style.opacity = opacity + p * (1 - opacity)
  const fadeOut = (el, p) => el.style.opacity = (1 - p) * opacity
  const animateMenu = (fn, cb) => animate(menu, fn, 322, ease.easeIn, cb)

  // scrollbar fns
  //----------------------------------------------------------
  function addMissingScrollbarStyles() {
    elst.add(body, {paddingRight: `${scrollW}px`})
    if (banner) {
      elst.add(banner,
        { width: `${windowW}px`
        , paddingRight: `${scrollW}px`
        }
      )
    }
  }

  function delMissingScrollbarStyles() {
    elst.del(body, 'padding-right')
    if (banner) elst.del(banner, ['width', 'padding-right'])
  }

  // BEM modifier class fns
  //----------------------------------------------------------
  function addModClasses() {
    elcl.add(menu, 'visible')
    elcl.add(body, 'no-scroll')
    elcl.add(footer, 'hidden')
  }

  function delModClasses() {
    elcl.del(menu, 'visible')
    elcl.del(body, 'no-scroll')
    elcl.del(footer, 'hidden')
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
    anim = animateMenu(fadeIn)
  }

  function close() {
    anim = animateMenu(fadeOut, postClose)
  }

  function toggleMenu(e) {
    // don't follow href
    e.preventDefault()

    // if not at top scroll to top
    if (window.pageYOffset !== 0) window.scroll(0,0)

    // stop running animation
    if (anim) anim.stop()

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
    if (scrollDown) scrollDown.style.left = `${Math.round(bodyW / 2)}px`
  }

  function reset() {
    if (anim) anim.stop()
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
