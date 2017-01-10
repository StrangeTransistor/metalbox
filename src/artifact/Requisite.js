/* @flow */

var resolver = require('bluebird').method

var Proxy = require('./Proxy')

module.exports
= function Requisite /* ::<REnv, Env> */
(
	check_requisite /* :WeakResolver<REnv> */,
	target          /* :T_Artifact<Env> */
)
	/* :T_Artifact<REnv & Env> */
{
	var $check_requisite = resolver(check_requisite)

	return Proxy(target, construct =>
	{
		return (env) =>
		{
			return $check_requisite(env)
			.then(() =>
			{
				return construct(env)
			})
		}
	})
}
