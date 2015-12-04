/**
 * @func animation
 * @desc animate an element with easing
 * @param {object} el - html element to animate
 * @param {function} deltaFn - function to apply delta of animation
 * @param {number} ms - total duration of animation
 * @param {object} easing - easing function
 * @param {function} [cb] - optional callback
 * @returns {object} stop method
 */
export default function animation(el, deltaFn, ms, easing, cb) {
  // initial vars
  const start = Date.now()
  const styles = window.getComputedStyle(el)
  let keepRunning = true

  // convenience fn
  const apply = p => deltaFn(el, p, styles)

  // main loop
  function loop() {
    if (keepRunning) {
      // percent elapsed time
      const pet = (Date.now() - start) / ms
      return pet >= 1 ? done() : cont(pet)
    }
  }

  // loop again
  function cont(p) {
    requestAnimationFrame(loop)
    apply(easing.get(p))
  }

  // finish animation
  function done() {
    apply(1)
    if (cb) return cb()
  }

  // start loop
  requestAnimationFrame(loop)

  // export stop method
  return {stop: () => keepRunning = false}
}
