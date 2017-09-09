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
		var input = env.src(env.entry)

		var plugins = []
		if (extname(input) !== '.ts')
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
			input: input,

			external: id => id !== input,

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
		.then(bundle =>
		{
			// HACK
			// console.log('---', bundle.code.match(/require.*\)/))
			bundle.code = bundle.code.replace(/\u0000/g, '')
			// console.log('---', bundle.code.match(/require.*\)/))
			return bundle
		})
		.then(bundle => bundle.code)
	}
}
