/* @flow */

var resolver = require('bluebird').method
var write = require('fs-sync').write

var Artifact = require('./Artifact')

module.exports = function File /* ::<Env: EnvOut> */
(
	filename   /* :string */,
	do_content /* :Producer<Env, string> */
)
	/* :T_Artifact<Env> */
{
	var produce = resolver(do_content)

	return Artifact(env =>
	{
		return produce(env)
		.then(content =>
		{
			write(env.out(filename), content)
		})
	})
}
