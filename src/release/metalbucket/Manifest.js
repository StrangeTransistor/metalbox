/* @flow */

var dump = require('../../json/dump')

var File = require('../../artifact/File')

var Rev = require('../../producer/Rev')

module.exports = function Manifest ()
{
	return File('release.json', (env /* :EnvPackage & EnvInstance */) =>
	{
		var release = {}

		release.timestamp = (new Date).toISOString()

		release.version = env.package.version

		release.instance = env.instance

		release.name = env.package.name + '-' + env.instance

		return Rev()
		.then(rev =>
		{
			release.git = rev

			return release
		})
		.then(dump)
	})
}
