/* @flow */

var Module  = require('module')
var nocache = require('require-nocache')

var asset = require('./pug-asset-hash')

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
		hash: env.hash,
		basedir: env.src(env.buckets_path),
		require: nocache(mod),
		asset: asset(env),
	}
}
