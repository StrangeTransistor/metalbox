'use strict'

function iop (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex.default : ex }

var mod = iop(require('./lib/mod'))

function main ()
{
	console.log(mod())
}

module.exports = main
