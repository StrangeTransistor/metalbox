/* @flow */

var MapEnv = require('../../artifact/MapEnv')

module.exports = function defaults (release /* :T_Release<*> */)
{
	return MapEnv((env) /* :EnvFrontend */ =>
	{
		return Object.assign({}, { buckets_path: 'buckets' }, env)
	}
	, release)
}
