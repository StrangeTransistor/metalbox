/* @flow */

var write = require('fs-sync').write

var Artifact  = require('../../artifact/Artifact')
var Composite = require('../../artifact/Composite')
var Glob      = require('../../artifact/Glob')
var Watch     = require('../../artifact/Watch')

var Rollup = require('../../producer/rollup/Backend')

var glob_js = '**/*.js'
var prod_glob = (env /* :EnvIn & EnvOut */) =>
{
	return [ glob_js, '!' + env.src.relative(env.dst('**')) ]
}
var prod_watch = (env /* :EnvOut */) =>
{
	return [ glob_js,
	{
		ignored: env.dst()
	}]
}


var Standard = module.exports.Standard = () =>
{
	var rollup = Rollup()

	return Glob('', prod_glob, '', (src, path, dst) =>
	{
		// TODO maybe create artifacts on-fly
		return rollup({ entry: src(path) })
		.then(code =>
		{
			return write(dst(path), code)
		})
	})
}

module.exports.Watch = () =>
{
	var rollup = Rollup()

	var art = Artifact(env =>
	{
		var entry = env.entry

		// TODO maybe create artifacts on-fly
		return rollup({ entry: env.src(entry) })
		.then(code =>
		{
			return write(env.dst(entry), code)
		})
	})

	art.describe = () =>
	{
		return '[Rollup]'
	}

	return Composite(
	[
		Standard(),
		Watch(prod_watch, art)
	])
}
