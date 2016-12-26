/* @flow */

var mkdir = require('mkdirp').sync

var Artifact = require('./Artifact')

module.exports = function Directory
(
	dir /* :string */
)
	/* :T_Artifact<EnvOut> */
{
	return Artifact(env =>
	{
		mkdir(env.out(dir))
	})
}
