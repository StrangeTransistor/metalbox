/* @flow */

var write = require('fs-sync').write

var Artifact = require('../../artifact/Artifact')
var Glob = require('../../artifact/Glob')
var Watch = require('../../artifact/Watch')

var Rollup = require('../../producer/rollup/Backend')

var glob = '**/*.js'

module.exports.Standard = () =>
{
	var rollup = Rollup()

	return Glob('', glob, '', (src, path, dst) =>
	{
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

	return Watch(glob, Artifact(env =>
	{
		var entry = env.entry

		console.log(entry)

		return rollup({ entry: env.src(entry) })
		.then(code =>
		{
			return write(env.dst(entry), code)
		})
	}))
}
