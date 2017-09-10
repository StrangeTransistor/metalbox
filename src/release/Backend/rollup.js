/* @flow */

var assign = Object.assign

var Artifact  = require('../../artifact/Artifact')

var Composite = require('../../artifact/Composite')
var Glob      = require('../../artifact/Glob')
var Watch     = require('../../artifact/Watch')
var Remover   = require('../../artifact/Remover')

var Rollup = require('../metalbucket/Rollup')

var smart_glob = require('../metalbucket/smart-js-glob')
var js_mode = require('../metalbucket/js-mode')

function smart_glob_web (options)
{
	return smart_glob(options).concat([ '!web/**' ])
}


var defaults =
{
	tests: false,
}

function Standard (options /* :$Shape<typeof defaults> */)
{
	options = assign({}, defaults, options)

	return Artifact(env =>
	{
		var glob = smart_glob_web(
		{
			tests: options.tests,
			ts: js_mode(env) === 'ts',
		})

		return Glob('', glob, '', Rollup())
		.construct(env)
	})
}

module.exports.Prod = () =>
{
	return Standard({ tests: false })
}

module.exports.Watch = () =>
{
	var watch = Artifact(env =>
	{
		var glob = smart_glob_web(
		{
			tests: true,
			ts: js_mode(env) === 'ts',
		})

		var watch = Watch(glob, Remover(Rollup()))

		/* TODO watch.disengage */
		return watch.construct(env)
	})

	return Composite(
	[
		Standard({ tests: true }),
		watch,
	])
}
