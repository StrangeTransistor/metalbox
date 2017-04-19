/* @flow */

var Module = require('module')

module.exports = function
(
	env /* :EnvFrontend */,
	filename /* :string */
)
{
	/* @flow-off Module */
	var mod = new Module(filename, null)
	mod.loaded = true
	mod.filename = filename
	/* eslint-disable no-underscore-dangle */
	/* @flow-off */
	mod.paths = Module._nodeModulePaths(filename)
	/* eslint-enable no-underscore-dangle */

	return {
		pretty: false,
		dev: env.dev || false,
		basedir: env.src(env.buckets_path),
		require: mod.require.bind(mod),
	}
}
