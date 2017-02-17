/* @flow */

var Composite = require('../../artifact/Composite')
var Glob      = require('../../artifact/Glob')
var Watch     = require('../../artifact/Watch')

var Rollup = require('../metalbucket/Rollup')

var glob = '**/*.js'

function Standard (globs /* :?string[] */)
{
	var $globs = [ glob ]
	if (globs)
	{
		$globs = globs
	}

	return Glob('', $globs, '', Rollup())
}

module.exports.Prod = () =>
{
	return Standard([ glob, '!test/**' ])
}

module.exports.Watch = () =>
{
	return Composite(
	[
		Standard(),
		Watch(glob, Rollup())
	])
}
