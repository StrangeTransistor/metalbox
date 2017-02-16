/* @flow */

var method = require('bluebird').method

var Proxy = require('./Proxy')

module.exports = function With /* ::<OuterEnv, InnerEnv> */
(
	target   /* :T_Artifact<InnerEnv> */,
	prod_env /* :WeakProducer<OuterEnv, InnerEnv> */
)
	/* :T_Artifact<OuterEnv> */
{
	var $prod_env = method(prod_env)

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
