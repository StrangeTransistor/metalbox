/* @flow */

var Composite = require('../../artifact/Composite')
var Glob      = require('../../artifact/Glob')
var Watch     = require('../../artifact/Watch')
var Remover   = require('../../artifact/Remover')

var Rollup = require('../metalbucket/Rollup')

var smart_glob = require('../metalbucket/smart-js-glob')

function smart_glob_web (options)
{
	var r = smart_glob(options)

	r = r.concat([ '!web/**' ])

	return r
}

function Standard (globs /* :?string[] */)
{
	if (globs)
	{
		var $globs = globs
	}
	else
	{
		var $globs = smart_glob_web()
	}

	return Glob('', $globs, '', Rollup())
}

module.exports.Prod = () =>
{
	return Standard(smart_glob_web({ tests: false }))
}

module.exports.Watch = () =>
{
	return Composite(
	[
		Standard(),
		Watch(smart_glob_web(), Remover(Rollup()))
	])
}
