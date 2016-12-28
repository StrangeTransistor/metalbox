/* @flow */

var Release = require('./Release')

var File = require('../artifact/File')

module.exports = function Frontend /* ::<Env: EnvFrontend> */ ()
/* :T_Release<Env> */
{
	return Release(
	[
		File('release.json', (env) =>
		{
			var release = {}

			release.version = env.version

			return String(release)
		})
	])
}
