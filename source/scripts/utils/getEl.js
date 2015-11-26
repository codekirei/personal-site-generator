function getTag(tagName) {
  return Array.prototype.slice.call(document.getElementsByTagName(tagName))
}

function getClass(className) {
  return Array.prototype.slice.call(document.getElementsByClassName(className))
}

export {getTag, getClass}
