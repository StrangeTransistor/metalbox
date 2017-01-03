/* @flow */

var resolver = require('bluebird').method

var Artifact = require('./Artifact')

module.exports = function MapEnv /* ::<InEnv, OutEnv> */
(
	prod_env /* :WeakProducer<InEnv, OutEnv> */,
	target   /* :T_Artifact<OutEnv> */
)
	/* :T_Artifact<InEnv> */
{
	var mapper = resolver(prod_env)

	return Artifact(env =>
	{
		return mapper(env)
		.then(env =>
		{
			return target.construct(env)
		})
	})
}
