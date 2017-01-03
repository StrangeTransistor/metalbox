/* @flow */

var dump = require('../json/dump')

var File = require('../artifact/File')
var Glob = require('../artifact/Glob')

var Pipeline = require('../producer/Pipeline')

var Pug = require('../producer/Pug')

var LessCss = require('../producer/LessCss')
var Autoprefixer = require('../pipe/Autoprefixer')
var CssNano = require('../pipe/CssNano')

var MapEnv = require('../artifact/MapEnv')
var Release = require('./Release')

module.exports = function Frontend /* ::<Env: EnvFrontend> */ ()
	/* :T_Release<Env> */
{
	return MapEnv(env =>
	{
		var env_out = {}

		env_out.src = env.src
		env_out.dst = env.dst

		env_out.buckets_path = (env.buckets_path || 'buckets')

		return env_out
	},
	Release(
	[
		File('release.json', (env /* :Env */) =>
		{
			var release = {}

			release.version = env.version
			release.timestamp = (new Date).toISOString()

			return dump(release)
		}),
		File('index.html', Pug()),
		File('index.css', Pipeline(
			LessCss(),
			Autoprefixer(),
			CssNano()
		)),
		Glob('buckets', '**/*.@(jpg|png|gif)', 'assets')
	]))
}
