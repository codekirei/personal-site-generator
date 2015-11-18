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
    dist: false
  }
  if (passedFlags['dist']) setFlags.dist = true
  return setFlags
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = flags
