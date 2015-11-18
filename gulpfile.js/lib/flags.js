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
    dist: false
  }
  if (passedFlags['w']) setFlags.watching = true
  if (passedFlags['dist']) setFlags.dist = true
  return setFlags
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = flags
