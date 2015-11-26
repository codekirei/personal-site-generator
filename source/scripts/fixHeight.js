import {getTag, getClass} from './utils/getEl'

function fixHeight() {
  if (typeof window.orientation !== 'undefined') {
    const html = getTag('html')[0]
    const body = getTag('body')[0]
    const banner = getClass('index-banner')[0]
    const height = [].slice.call()[0].height()
  }
}

export default fixHeight
