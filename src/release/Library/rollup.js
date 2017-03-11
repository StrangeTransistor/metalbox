/* @flow */

var assign = Object.assign

var Glob = require('../../artifact/Glob')
var Copy = require('../../artifact/Copy')
var Composite = require('../../artifact/Composite')
var With = require('../../artifact/With')

var Watch = require('../../artifact/Watch')

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

	return Composite(
	[
		Glob('', $globs, '', Copy()),
		Glob('', $globs, 'dist', Rollup())
	])
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
		Watch([ glob ], Composite(
		[
			Copy(),
			With(Rollup(), dist)
		]))
	])
}

var dist = (env) => assign({}, env, { dst: env.dst.partial('dist') })

module.exports.Types = () =>
{
	return Glob('', 'flow-typed/**', '', Copy())
}
