/* @flow */

var rollup = require('rollup')

var flow = require('rollup-plugin-flow')

module.exports = function Rollup ()
	/* :Producer<EnvIn & EnvEntry, string> */
{
	return (env) =>
	{
		var entry = env.src(env.entry)

		return rollup.rollup(
		{
			entry: entry,

			external: id => id !== entry,

			plugins:
			[
				flow({ pretty: true }),
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
