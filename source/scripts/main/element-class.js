export default function main(el, state) {
  const name = el.className.split(/\s/)[0]
  const nameState = `${name}--${state}`

  const toggle = () => el.classList.toggle(nameState)
  const ensure = () => {if (el.className.indexOf(nameState) === -1) toggle()}

  return {toggle, ensure}
}

// export default function main(elsOrEl, state) {
//   return elsOrEl.length
//     ? elsOrEl.map(el => toggleCssState(el, state))
//     : toggleCssState(elsOrEl, state)
// }
