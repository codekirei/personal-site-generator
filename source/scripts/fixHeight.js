import {getTag, getClass} from './utils/getEl'

function fixHeight() {
  // hack to target mobile
  if (typeof window.orientation !== 'undefined') {
    const html = getTag('html')[0]
    const body = getTag('body')[0]
    const banner = getClass('index-banner')[0]
    const height = window.innerHeight
    const els = [html, body, banner]
    els.map(el => {
      el.style.height = `${height}px`
    })
    const arrow = getClass('scroll-down')[0]
    const arrowHeight = getComputedStyle(arrow)['height']
      .replace('px', '')
    const top = height - parseInt(arrowHeight)
    arrow.style.top = `${top}px`
    arrow.style.animation = 'bounce-top 1.5s infinite'
  }
}

export default fixHeight
