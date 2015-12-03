export default class Loops {
  constructor(opts) {
    this.running = {}
    this.delay = opts && opts.delay ? opts.delay : 50
    this.step = opts && opts.step ? opts.step : 0.01
    this.scale = opts && opts.scale ? opts.scale : 0.01
  }

  elName(el) {
    return el.getAttribute('class').split(/\s/)[0]
  }

  fadeIn(el, opacity, step) {
    step = step || this.step
    const name = this.elName(el)
    this.running[name] = setTimeout(() => {
      const easing = step + this.scale
      opacity = Math.min(opacity + step, 1)
      el.style.opacity = opacity
      opacity < 1
        ? this.fadeIn(el, opacity, easing)
        : delete this.running[name]
    }, this.delay)
  }

  fadeOut(el, opacity, step) {
    step = step || this.step
    const name = this.elName(el)
    this.running[name] = setTimeout(() => {
      const easing = step + this.scale
      opacity = Math.max(opacity - step, 0).toFixed(2)
      el.style.opacity = opacity
      opacity > 0
        ? this.fadeOut(el, opacity, easing)
        : delete this.running[name]
    }, this.delay)
  }

  done(cb) {
    this.running['__done__'] = setTimeout(() => {
      if (Object.keys(this.running).length === 1) {
        delete this.running['__done__']
        return cb()
      }
      this.done(cb)
    }, this.delay)
  }
}
