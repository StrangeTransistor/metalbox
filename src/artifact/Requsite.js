/* @flow */

var Artifact = require('./Artifact')

module.exports
= function Requisite
(
	requisite /* :Resolver */,
	target    /* :T_Artifact */
)
	/* :T_Artifact */
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
