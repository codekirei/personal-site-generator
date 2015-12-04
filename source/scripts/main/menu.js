//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
import getEl from 'get-element'
import domready from 'domready'
import ease from 'bezier-easing'

// local
import toggleCss from './toggleCssState'
import {animate, mAnimate} from './animate'

//----------------------------------------------------------
// main loop
//----------------------------------------------------------
function menuEvents() {
  // top-level vars
  //----------------------------------------------------------
  let menuIsOpen = false
  let interrupt = false
  let activeAnimations = {}
  let step = 0

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

  // animation deltaFns
  //----------------------------------------------------------
  function fadeOut(el, p, styles) {
    const start = parseFloat(styles.opacity)
    el.style.opacity = (1 - p) * start
  }

  function fadeIn(el, p, styles) {
    const start = parseFloat(styles.opacity)
    el.style.opacity = start + p * (1 - start)
  }

  // declare fns for listener cb
  //----------------------------------------------------------
  function openMenu() {
    menuIsOpen = true
    interrupt = false
    function next() {
      if (!interrupt) {
        step += 1
        return iterator()
      }
    }
    function iterator() {
      switch (step) {
        case 1:
          toggleCss([arrow, arrowSvg], 'paused')
          return next()

        case 2:
          function done() {
            delete activeAnimations.fadeOut2
            return next()
          }
          activeAnimations.fadeOut2 = mAnimate(
            [banner, arrow],
            fadeOut,
            1500,
            ease.easeInOut,
            done
          )
          break

        case 3:
          toggleCss(menu, 'open')
          return next()

        case 4:
          activeAnimations.fadeIn4 = animate(
            menuList,
            fadeIn,
            1500,
            ease.easeInOut,
            () => delete activeAnimations.fadeIn4
          )
      }
    }
    // maybe?
    next()
  }

  function closeMenu() {
    // menuIsOpen = false
    // interrupt = false
    // // fade out menuList
    // fadeOut([menuList])
    // // toggle menu css
    // toggleCss(menu, 'open')
    // // fade in banner and arrow
    // fadeIn([banner, arrow])
    // // start css animation
    // toggleCss([arrow, arrowSvg], 'paused')
    console.log('closeMenu clicked')
  }

  function toggleMenu(e) {
    // ignore href
    e.preventDefault()

    // scroll to top of page
    if (window.pageYOffset !== 0) window.scroll(0, 0)

    // kill any previous activity
    interrupt = true
    Object.keys(activeAnimations).map(anim => activeAnimations[anim].stop())

    // pick and run menu toggle fn
    return menuIsOpen ? closeMenu() : openMenu()
  }

  // attach listener
  //----------------------------------------------------------
  menuButton.addEventListener('click', toggleMenu)
}

//----------------------------------------------------------
// export
//----------------------------------------------------------
export default domready(menuEvents)
