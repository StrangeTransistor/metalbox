/* @flow */

var mkdir = require('mkdirp').sync

var Artifact = require('./Artifact')

module.exports = function Directory /* ::<Env: EnvOut> */
(
	dir /* :?string */
)
	/* :T_Artifact<Env> */
{
	return Artifact(env =>
	{
		mkdir(env.dst(dir || ''))
	})
}
