function stateClass(el, state) {
  const name = el.className.split(/\s/)[0]
  return `${name}--${state}`
}

const toggle = (el, state) => el.classList.toggle(stateClass(el, state))

function ensure(el, state) {
  const sc = stateClass(el, state)
  if (el.className.indexOf(sc) === -1) {
    el.classList.toggle(sc)
  }
}

export default {toggle, ensure}
