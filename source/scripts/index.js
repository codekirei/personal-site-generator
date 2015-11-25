import domready from 'domready'

domready(() => {
  console.log('hello world')
})

//----------------------------------------------------------
// syntax highlighting
//----------------------------------------------------------
import hljs from './vendor/highlight.js'

hljs.initHighlightingOnLoad()
