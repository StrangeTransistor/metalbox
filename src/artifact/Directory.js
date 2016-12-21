/* @flow */

// TODO rm overlap-artifact:
var Artifact /* :Function */ = require('./Artifact')

var mkdir = require('mkdirp').sync

module.exports = function Directory
(
	dir /* :string */
)
	/* :Artifact<void> */
{
	return Artifact(env =>
	{
		mkdir(env.rootpath(dir))
	})
}
