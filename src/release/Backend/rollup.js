/* @flow */

var Composite = require('../../artifact/Composite')
var Glob      = require('../../artifact/Glob')
var Watch     = require('../../artifact/Watch')

var Rollup = require('../metalbucket/Rollup')

var glob = require('../metalbucket/smart-js-glob')

function Standard (globs /* :?string[] */)
{
	if (globs)
	{
		var $globs = globs
	}
	else
	{
		var $globs = glob.slice()
	}

	return Glob('', $globs, '', Rollup())
}

module.exports.Prod = () =>
{
	return Standard(glob.concat([ '!test/**', '!tests/**' ]))
}

module.exports.Watch = () =>
{
	return Composite(
	[
		Standard(),
		Watch(glob, Rollup())
	])
}
