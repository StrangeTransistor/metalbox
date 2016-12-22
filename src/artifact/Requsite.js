/* @flow */

var Artifact = require('./Artifact')

module.exports
= function Requisite /* ::<REnv, Env> */
(
	requisite /* :Resolver<REnv> */,
	target    /* :T_Artifact<Env> */
)
	/* :T_Artifact<REnv & Env> */
{
	return Artifact(env =>
	{
		return requisite(env)
		.then(() =>
		{
			return target.construct(env)
		})
	})
}
