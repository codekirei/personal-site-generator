//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
import getEl from 'get-element'
import domready from 'domready'

// local
import toggleCss from './toggleCssState'
import Loops from './loops'

//----------------------------------------------------------
// instantiate classes
//----------------------------------------------------------
const loops = new Loops()

//----------------------------------------------------------
// convenience funcs
//----------------------------------------------------------
const scrollTop = () => {if (window.pageYOffset !== 0) window.scroll(0, 0)}
const fadeOut = els => els.map(el => loops.fadeOut(el, el.style.opacity))
const fadeIn = els => els.map(el => loops.fadeIn(el, el.style.opacity))

//----------------------------------------------------------
// main loop
//----------------------------------------------------------
function menuEvents() {
  // store state
  //----------------------------------------------------------
  let menuState = 'closed'

  // get elements
  //----------------------------------------------------------
  const menuButton = getEl.withClass('menu-toggle')[0]
  const banner = getEl.withClass('index-banner__content')[0]
  const arrow = getEl.withClass('scroll-down')[0]
  const arrowSvg = getEl.withClass('scroll-down__svg')[0]
  const menu = getEl.withClass('menu')[0]
  const menuList = getEl.withClass('menu__list')[0]

  // attach opacity to manipulate with js
  //----------------------------------------------------------
  banner.style.opacity = 1
  arrow.style.opacity = 1
  menuList.style.opacity = 0

  // declare fns for listener cb
  //----------------------------------------------------------
  function openMenu() {
    menuState = 'transition'
    // pause css animation
    toggleCss([arrow, arrowSvg], 'paused')
    // fade out banner and arrow
    fadeOut([banner, arrow])
    // when that's done
    loops.done(() => {
      // toggle menu css
      toggleCss(menu, 'open')
      // fade in menuList
      fadeIn([menuList])
      // toggle state
      menuState = 'open'
    })
  }

  function closeMenu() {
    menuState = 'transition'
    // fade out menuList
    fadeOut([menuList])
    // when that's done
    loops.done(() => {
      // toggle menu css
      toggleCss(menu, 'open')
      // fade in banner and arrow
      fadeIn([banner, arrow])
    })
    // when that's done
    loops.done(() => {
      // start css animation
      toggleCss([arrow, arrowSvg], 'paused')
      // toggle state
      menuState = 'closed'
    })
  }

  function toggleMenu(e) {
    e.preventDefault()
    scrollTop()
    // Object.keys(loops.running).map(loop => clearTimeout(loops.running[loop]))
    if (menuState === 'open') closeMenu()
    if (menuState === 'closed') openMenu()
  }

  // attach listener
  //----------------------------------------------------------
  menuButton.addEventListener('click', toggleMenu)
}

//----------------------------------------------------------
// export
//----------------------------------------------------------
export default domready(menuEvents)
