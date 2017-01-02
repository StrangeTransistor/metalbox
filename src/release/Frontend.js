/* @flow */

// TODO any
var assign /* :any */ = Object.assign

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
		return assign({}, defaults, env)
	},
	Release(
	[
		File('release.json', env =>
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

var defaults =
{
	buckets_path: 'buckets'
}
