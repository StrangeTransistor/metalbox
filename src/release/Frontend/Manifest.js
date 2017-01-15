/* @flow */

var dump = require('../../json/dump')

var File = require('../../artifact/File')

module.exports = function Manifest ()
{
	return File('release.json', (env /* :EnvVersion */) =>
	{
		var release = {}

		release.version = env.version
		release.timestamp = (new Date).toISOString()

		return dump(release)
	})
}
