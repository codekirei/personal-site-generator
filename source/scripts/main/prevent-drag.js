import el from 'get-element'
import domready from 'domready'

function preventDrag() {
  const body = el.withTag('body')[0]
  body.addEventListener('dragstart', e => e.preventDefault())
}

export default domready(preventDrag)
