/* @flow */

var Proxy = require('../../artifact/Proxy')

var ReleaseNotify = require('../../notify/release-notify')

module.exports = function defaults (release /* :T_Release<*> */)
{
	return Proxy(release, construct =>
	{
		return (env) =>
		{
			var $env = Object.assign({}, { buckets_path: 'buckets' }, env)

			$env.notifier = ReleaseNotify($env)

			return construct(($env /* :EnvFrontend */))
		}
	})
}
