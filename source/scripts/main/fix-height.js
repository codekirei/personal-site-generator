import el from 'get-element'
import domready from 'domready'

function fixHeight() {
  // hack to target mobile
  if (typeof window.orientation !== 'undefined') {
    const html = el.withTag('html')[0]
    const body = el.withTag('body')[0]
    const banner = el.withClass('index-banner')[0]
    const height = window.innerHeight
    const els = [html, body, banner]
    els.map(el => {
      el.style.height = `${height}px`
    })
    const arrow = el.withClass('scroll-down')[0]
    const arrowHeight = getComputedStyle(arrow)['height']
      .replace('px', '')
    const top = height - parseInt(arrowHeight)
    arrow.style.top = `${top}px`
    arrow.style.animation = 'bounce-top 1.5s infinite'
  }
}

// domready(() => fixHeight())
export default domready(fixHeight)
