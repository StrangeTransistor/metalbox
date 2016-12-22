/* @flow */

var Artifact = require('./Artifact')

var mkdir = require('mkdirp').sync

module.exports = function Directory
(
	dir /* :string */
)
	/* :T_Artifact<T_Env_Out> */
{
	return Artifact(env =>
	{
		mkdir(env.out(dir))
	})
}
