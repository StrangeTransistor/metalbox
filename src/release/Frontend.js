/* @flow */

var Release = require('./Release')

var File = require('../artifact/File')

var dump = require('../json/dump')

module.exports = function Frontend /* ::<Env: EnvFrontend> */ ()
/* :T_Release<Env> */
{
	return Release(
	[
		File('release.json', (env) =>
		{
			var release = {}

			release.version = env.version
			release.timestamp = (new Date).toISOString()

			return dump(release)
		})
	])
}
