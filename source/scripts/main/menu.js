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
  // settings
  //----------------------------------------------------------
  const cfg = {
    easing: ease.easeOut,
    t: 1000
  }

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
    // prep
    menuIsOpen = true
    interrupt = false

    // step-through fn
    function next() {
      if (!interrupt) {
        step += 1
        return iterator()
      }
    }

    // steps
    function iterator() {
      switch (step) {
        case 1:
          toggleCss([arrow, arrowSvg], 'paused')
          return next()

        case 2:
          activeAnimations.fadeOut2 = mAnimate(
            [banner, arrow], fadeOut, cfg.t, cfg.easing, () => {
              delete activeAnimations.fadeOut2
              return next()
            }
          )
          break

        case 3:
          toggleCss(menu, 'open')
          return next()

        case 4:
          activeAnimations.fadeIn4 = animate(
            menuList, fadeIn, cfg.t, cfg.easing,
            () => delete activeAnimations.fadeIn4
          )
          break
      }
    }

    // kick off
    return step === 0
      ? next()
      : iterator()
  }

  function closeMenu() {
    // prep
    menuIsOpen = false
    interrupt = false

    // step-through fn
    function prev() {
      if (!interrupt) {
        step -= 1
        return iterator()
      }
    }

    // steps
    function iterator() {
      switch (step) {
        case 1:
          toggleCss([arrow, arrowSvg], 'paused')
          return prev()

        case 2:
          activeAnimations.fadeIn2 = mAnimate(
            [banner, arrow], fadeIn, cfg.t, cfg.easing, () => {
              delete activeAnimations.fadeIn2
              return prev()
            }
          )
          break

        case 3:
          toggleCss(menu, 'open')
          return prev()

        case 4:
          activeAnimations.fadeOut4 = animate(
            menuList, fadeOut, cfg.t, cfg.easing, () => {
              delete activeAnimations.fadeOut4
              return prev()
            }
          )
          break
      }
    }

    // kick off
    return iterator()
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
