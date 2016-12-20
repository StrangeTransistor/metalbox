/* @flow */

var Artifact = require('./Artifact')

var mkdir = require('mkdirp').sync

module.exports = function Directory
(
	dir /* :string */
)
	/* :Artifact */
{
	return Artifact(env =>
	{
		mkdir(env.rootpath(dir))
	})
}
