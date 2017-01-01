/* @flow */

var dump = require('../json/dump')

var File = require('../artifact/File')

var LessCss = require('../producer/LessCss')

var Release = require('./Release')

module.exports = function Frontend /* ::<Env: EnvFrontend> */ ()
/* :T_Release<Env> */
{
	return Release(
	[
		File('release.json', env =>
		{
			var release = {}

			release.version = env.version
			release.timestamp = (new Date).toISOString()

			return dump(release)
		}),
		File('index.css', LessCss())
	])
}
