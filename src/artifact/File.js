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
	var $prod_content = resolver(prod_content)

	var art = Artifact(env =>
	{
		return $prod_content(env)
		.then(content =>
		{
			write(env.dst(filename), content)
		})
	})

	art.describe = () =>
	{
		return `[File ${filename}]`
	}

	return art
}
