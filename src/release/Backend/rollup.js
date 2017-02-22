/* @flow */

var Composite = require('../../artifact/Composite')
var Glob      = require('../../artifact/Glob')
var Watch     = require('../../artifact/Watch')

var Rollup = require('../metalbucket/Rollup')

var glob = [ '**/*.js', '!**/flow-typed/**' ]

function Standard (globs /* :?string[] */)
{
	var $globs = glob.slice()

	if (globs)
	{
		$globs = globs
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
		Watch([ glob, {} ], Rollup())
	])
}
