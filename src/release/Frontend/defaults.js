/* @flow */

var Proxy = require('../../artifact/Proxy')

var ReleaseNotify = require('../../notify/release-notify')
var Printer = require('../../printer')

module.exports = function defaults (release /* :T_Release<*> */)
{
	return Proxy(release, construct =>
	{
		return (env) =>
		{
			var $env = Object.assign({}, { buckets_path: 'buckets' }, env)

			$env.notifier = ReleaseNotify($env)
			$env.printer  = Printer(process.stdout)

			return construct($env)
		}
	})
}
