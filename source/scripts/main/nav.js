import el from 'get-element'
import domready from 'domready'

function navEvents() {
  const openButton = el.withClass('menu-open')[0]
  const closeButton = el.withClass('menu-close')[0]
  const body = el.withTag('body')[0]
  const nav = el.withClass('top-nav')[0]
  const navList = el.withClass('top-nav__list')[0]

  function openNav(e) {
    nav.style.display = 'flex'
    if (window.innerHeight > navList.clientHeight) {
      e.preventDefault()
      closeButton.style.display = 'block'
      body.setAttribute('style', 'height: 100%; overflow: hidden;')
    } else {
      nav.removeAttribute('style')
    }
  }

  function closeNav(e) {
    [nav, closeButton, body].map(_ => _.removeAttribute('style'))
    e.preventDefault()
  }

  openButton.addEventListener('click', openNav)
  closeButton.addEventListener('click', closeNav)
}

export default domready(navEvents)
