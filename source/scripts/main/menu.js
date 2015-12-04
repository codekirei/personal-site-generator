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
  // top-level vars
  //----------------------------------------------------------
  let menuIsOpen = true // a convenient lie
  let running = {}
  let opacity

  // relevant elements
  //----------------------------------------------------------
  const menuButton = getEl.withClass('menu-toggle')[0]
  const menu = getEl.withClass('menu')[0]

  // set opacity on menu to manipulate
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

  function open() {
    elcl(menu, 'visible').ensure()
    running.in = a(fadeIn)
  }

  function close() {
    running.out = a(fadeOut, () => elcl(menu, 'visible').toggle())
  }

  function toggleMenu(e) {
    e.preventDefault()
    menuIsOpen = !menuIsOpen
    // if (window.pageYOffset !== 0) window.scroll(0, 0)
    // toggle noscroll on body?
    // change location of burger?
    Object.keys(running).map(anim => running[anim].stop())
    opacity = parseFloat(menu.style.opacity)
    return menuIsOpen ? close() : open()
  }

  // attach listener
  //----------------------------------------------------------
  menuButton.addEventListener('click', toggleMenu)
}

//----------------------------------------------------------
// export
//----------------------------------------------------------
export default domready(menuEvents)
