/* @flow */

var resolver = require('bluebird').method

var Proxy = require('./Proxy')

module.exports = function With /* ::<OuterEnv, InnerEnv> */
(
	target   /* :T_Artifact<InnerEnv> */,
	prod_env /* :WeakProducer<OuterEnv, InnerEnv> */
)
	/* :T_Artifact<OuterEnv> */
{
	var $prod_env = resolver(prod_env)

	return Proxy(target, construct =>
	{
		return (env /* :OuterEnv */) =>
		{
			return $prod_env(env)
			.then((env /* :InnerEnv */) =>
			{
				return construct(env)
			})
		}
	})
}
