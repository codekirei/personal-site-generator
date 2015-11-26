function getTag(tagName) {
  return [].slice.call(document.getElementsByTagName(tagName))
}

function getClass(className) {
  return [].slice.call(document.getElementsByClassName(className))
}

export {getTag, getClass}
