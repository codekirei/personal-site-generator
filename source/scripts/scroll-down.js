import smoothScroll from 'smooth-scroll'

smoothScroll.init(
  { selector: '[data-scroll]'
  // , selectorHeader:
  , speed: 500
  , easing: 'easeInOutCubic'
  , updateURL: false
  , offset: 0
  // , callback:
  }
)
