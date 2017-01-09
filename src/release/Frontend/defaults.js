/* @flow */

var MapEnv = require('../../artifact/MapEnv')

var ReleaseNotify = require('../../notify/release-notify')

module.exports = function defaults (release /* :T_Release<*> */)
{
	return MapEnv((env) /* :EnvFrontend */ =>
	{
		var $env = Object.assign({}, { buckets_path: 'buckets' }, env)

		$env.notifier = ReleaseNotify($env)

		return $env
	}
	, release)
}
