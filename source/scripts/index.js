import domready from 'domready'

domready(() => {
  console.log('hello world')
})

//----------------------------------------------------------
// fix height
//----------------------------------------------------------
import fixHeight from './fixHeight'
domready(() => {
  fixHeight()
})

//----------------------------------------------------------
// syntax highlighting
//----------------------------------------------------------
import hljs from './vendor/highlight.js'

hljs.initHighlightingOnLoad()
