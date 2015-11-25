import domready from 'domready'
import logger from './logger'

domready(() => {
  console.log('hello world')
  logger()
})
