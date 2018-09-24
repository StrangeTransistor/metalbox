'use strict'

function iop (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex.default : ex }

var mod = iop(require('./mod'))

function index (prefix)
{
	return prefix + mod()
}

module.exports = index
