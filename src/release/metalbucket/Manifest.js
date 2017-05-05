/* @flow */
/* ::

type Env = EnvPackage & EnvInstanceOptional & EnvHashOptional;

*/

var dump = require('../../json/dump')

var File = require('../../artifact/File')

var Rev = require('../../Rev')

module.exports = function Manifest ()
{
	return File('release.json', (env /* :Env */) =>
	{
		var release = {}

		release.timestamp = (new Date).toISOString()

		release.version = env.package.version

		var instance = env.instance

		if (instance)
		{
			release.instance = instance

			release.name = env.package.name + '-' + instance
		}

		var hash = env.hash

		if (hash)
		{
			release.hash = hash
		}

		return Rev()
		.then(rev =>
		{
			release.git = rev

			return release
		})
		.then(dump)
	})
}
