/* @flow */
/* ::

type EnvRollupBackend =
{
	entry: string
}

*/

var rollup = require('rollup')

// var globals  = require('rollup-plugin-node-globals')
// var resolve  = require('rollup-plugin-node-resolve')
// var commonjs = require('rollup-plugin-commonjs')
// var json     = require('rollup-plugin-json')
var flow     = require('rollup-plugin-flow')

module.exports = function Rollup ()
{
	return (env /* :EnvRollupBackend */) =>
	{
		var entry = env.entry

		return rollup.rollup(
		{
			entry: entry,

			external: id => id !== entry,

			plugins:
			[
				flow(),
				//globals(),
				/*resolve(
				{
					jsnext:  true,
					browser: false,
				}),*/
				/*commonjs(
				{
					sourcemap: false,
					exclude: [ '**' ]
				}),*/
				// json(),
			],

			/*
			acorn:
			{
				allowReserved: true
			},
			*/

			// onwarn: console.warn
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
