/* @flow */

var Artifact  = require('../../artifact/Artifact')
var Composite = require('../../artifact/Composite')
var Glob      = require('../../artifact/Glob')
var Watch     = require('../../artifact/Watch')

var Rollup = require('../metalbucket/rollup-transform')

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
	return Standard()
}

module.exports.Watch = () =>
{
	var transform = Rollup()

	var art = Artifact(env =>
	{
		return transform(env.src, env.entry, env.dst)
	})

	art.describe = () =>
	{
		return '[Rollup]'
	}

	return Composite(
	[
		Standard(),
		Watch(glob, art)
	])
}
