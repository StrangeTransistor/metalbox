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
	var $prod_env = resolver(prod_env)

	var art = Artifact(env =>
	{
		return $prod_env(env)
		.then(env =>
		{
			return target.construct(env)
		})
	})

	art.disengage = () =>
	{
		return target.disengage()
	}

	return art
}
