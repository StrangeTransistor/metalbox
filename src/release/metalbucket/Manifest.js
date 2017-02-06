/* @flow */

var dump = require('../../json/dump')

var File = require('../../artifact/File')

var Rev = require('../../producer/Rev')

module.exports = function Manifest ()
{
	return File('release.json', (env /* :EnvPackage */) =>
	{
		var release = {}

		release.version = env.package.version
		release.timestamp = (new Date).toISOString()

		return Rev()
		.then(rev =>
		{
			release.git = rev

			return release
		})
		.then(dump)
	})
}
