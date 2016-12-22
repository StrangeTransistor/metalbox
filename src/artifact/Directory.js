/* @flow */

var Artifact = require('./Artifact')

var mkdir = require('mkdirp').sync

module.exports = function Directory
(
	dir /* :string */
)
	/* :T_Artifact */
{
	return Artifact(env =>
	{
		mkdir(env.rootpath(dir))
	})
}
