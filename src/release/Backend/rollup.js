/* @flow */

var Composite = require('../../artifact/Composite')
var Glob      = require('../../artifact/Glob')
var Watch     = require('../../artifact/Watch')
var Remover   = require('../../artifact/Remover')

var Rollup = require('../metalbucket/Rollup')

var smart_glob = require('../metalbucket/smart-js-glob')

function smart_glob_web (options)
{
	return smart_glob(options).concat([ '!web/**' ])
}


function Standard (glob /* :string[] */)
{
	return Glob('', glob, '', Rollup())
}

module.exports.Prod = () =>
{
	return Standard(smart_glob_web({ tests: false }))
}

module.exports.Watch = () =>
{
	var glob = smart_glob_web()

	return Composite(
	[
		Standard(glob),
		Watch(glob, Remover(Rollup()))
	])
}
