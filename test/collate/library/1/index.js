'use strict'

function iop (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex.default : ex }

var main = iop(require('./lib/index'))

main('@prefix-')
