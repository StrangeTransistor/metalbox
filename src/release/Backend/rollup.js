/* @flow */

var Artifact  = require('../../artifact/Artifact')
var Composite = require('../../artifact/Composite')
var Glob      = require('../../artifact/Glob')
var Watch     = require('../../artifact/Watch')

var Rollup = require('../metalbucket/rollup-transform')

var glob = '**/*.js'

var Standard = module.exports.Standard = () =>
{
	return Glob('', glob, '', Rollup())
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
