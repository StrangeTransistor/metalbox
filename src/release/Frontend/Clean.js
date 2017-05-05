/* @flow */

var rm = require('fs-sync').remove

var Artifact = require('../../artifact/Artifact')
var Glob = require('../../artifact/Glob')

module.exports = function Clean ()
{
	var Rm = Artifact(env =>
	{
		// console.log('Clean', env.entry)

		rm(env.dst(env.entry))
	})

	return Glob(env => env.dst(),
		[ 'index.*.@(css|js)', 'assets-*' ],
		'',
		Rm,
		{ recursive: true }
	)
}
