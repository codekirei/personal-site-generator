import smoothScroll from 'smooth-scroll'

export default smoothScroll.init(
  { selector: '[data-scroll]'
  // , selectorHeader:
  , speed: 500
  , easing: 'easeInOutCubic'
  , updateURL: false
  , offset: 0
  , callback: el => el.blur() // remove :focus from element
  }
)
