/* @flow */

var Glob = require('../../artifact/Glob')

module.exports = function Assets ()
{
	return Glob(
		env => env.src(env.buckets_path),
		'**/*.@(jpg|png|gif)',
		'assets'
	)
}
