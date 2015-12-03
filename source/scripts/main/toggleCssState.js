function toggleCssState(el, state) {
  const name = el.getAttribute('class').split(/\s/)[0]
  el.classList.toggle(`${name}--${state}`)
}

export default function main(elsOrEl, state) {
  return elsOrEl.length
    ? elsOrEl.map(el => toggleCssState(el, state))
    : toggleCssState(elsOrEl, state)
}
