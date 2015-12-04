function add(el, style) {
  const meta = _ => Object.keys(style).map(key => _.style[key] = style[key])
  el.length ? el.map(meta) : meta(el)
}

function del(el, style) {
  typeof style === 'string'
    ? el.style.removeProperty(style)
    : style.map(_ => el.style.removeProperty(_))
  if (el.style.length === 0) el.removeAttribute('style')
}

export default {add, del}
