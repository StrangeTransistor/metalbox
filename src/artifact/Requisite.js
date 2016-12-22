/* @flow */

var resolver = require('bluebird').method

var Artifact = require('./Artifact')

module.exports
= function Requisite /* ::<REnv, Env> */
(
	check_requisite /* :WeakResolver<REnv> */,
	target          /* :T_Artifact<Env> */
)
	/* :T_Artifact<REnv & Env> */
{
	var requisite = resolver(check_requisite)

	return Artifact(env =>
	{
		return requisite(env)
		.then(() =>
		{
			return target.construct(env)
		})
	})
}
