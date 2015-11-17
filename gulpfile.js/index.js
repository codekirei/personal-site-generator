'use strict'

const requireDir = require('require-dir')

// recursively require all tasks
requireDir('./tasks', {recurse: true})
