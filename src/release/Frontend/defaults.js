/* @flow */

var Proxy = require('../../artifact/Proxy')

module.exports = function defaults (release /* :T_Release<*> */)
{
	return Proxy(release, construct =>
	{
		return (env) =>
		{
			env = Object.assign({}, { buckets_path: 'buckets' }, env)

			return construct(env)
		}
	})
}
