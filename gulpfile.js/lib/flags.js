'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const minimist = require('minimist')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function flags() {
  const passedFlags = minimist(process.argv)
  const setFlags = {
    watching: false,
    dev: false
  }
  if (passedFlags['w']) setFlags.watching = true
  if (passedFlags['dev']) setFlags.dev = true
  return setFlags
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = flags
