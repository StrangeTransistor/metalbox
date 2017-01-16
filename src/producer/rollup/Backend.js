/* @flow */
/* ::

type EnvRollupBackend =
{
	entry: string
}

*/

var rollup = require('rollup')

var flow = require('rollup-plugin-flow')

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
			],
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
