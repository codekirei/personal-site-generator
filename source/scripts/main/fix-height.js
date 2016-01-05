import el from 'get-element'
import domready from 'domready'

function fixHeight() {
  const body = el.withTag('body')[0]
  const hasBanner = body.classList.contains('has-banner')

  // hack to target mobile
  const mobile = typeof window.orientation !== 'undefined'

  if (mobile && hasBanner) {
    const html = el.withTag('html')[0]
    const banner = el.withClass('banner')[0]
    const height = window.innerHeight
    const els = [html, body, banner]
    els.map(element => {
      element.style.height = `${height}px`
    })
    const arrow = el.withClass('scroll-down')[0]
    const arrowHeight = getComputedStyle(arrow)['height']
      .replace('px', '')
    const top = height - parseInt(arrowHeight)
    arrow.style.top = `${top}px`
    arrow.style.animation = 'bounce-top 1.5s infinite'
  }
}

export default domready(fixHeight)
