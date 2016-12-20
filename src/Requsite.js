/* @flow */

// TODO rm:
var Artifact /* :Function */ = require('./Artifact')

module.exports
= function Requisite
(
	requisite /* :Resolver */,
	target    /* :Artifact */
)
	/* :Artifact */
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
