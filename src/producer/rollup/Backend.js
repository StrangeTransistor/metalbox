/* @flow */

var extname = require('path').extname

var rollup = require('rollup')

var flow = require('rollup-plugin-flow')
var ts = require('rollup-plugin-typescript')

module.exports = function Rollup ()
	/* :Producer<EnvIn & EnvEntry, string> */
{
	return (env) =>
	{
		var entry = env.src(env.entry)

		var plugins = []
		if (extname(entry) !== '.ts')
		{
			plugins.push(flow({ pretty: true }))
		}
		else
		{
			plugins.push(ts(
			{
				typescript: require('typescript')
			}))
		}

		return rollup.rollup(
		{
			entry: entry,

			external: id => id !== entry,

			plugins: plugins,
		})
		.then(bundle =>
		{
			return bundle.generate(
			{
				format:  'cjs',
				exports: 'auto',
			})
		})
		.then(bundle => bundle.code)
	}
}
