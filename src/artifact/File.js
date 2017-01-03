/* @flow */

var resolver = require('bluebird').method
var write = require('fs-sync').write

var Artifact = require('./Artifact')

module.exports = function File /* ::<Env: EnvOut> */
(
	filename     /* :string */,
	prod_content /* :WeakProducer<Env, string> */
)
	/* :T_Artifact<Env> */
{
	var produce = resolver(prod_content)

	return Artifact(env =>
	{
		return produce(env)
		.then(content =>
		{
			write(env.dst(filename), content)
		})
	})
}
