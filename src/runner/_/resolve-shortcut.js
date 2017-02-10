/* @flow */

var bold = require('cli-color').bold

var resolve = require('./resolve')

module.exports = function
(
	rootpath /* :T_Rootpath */,
	release_name /* :string */
)
	/* @flow-off */
	/* :() => T_Artifact<any> */
{
	try
	{
		return resolve(rootpath, release_name)
	}
	catch (e)
	{
		console.error(`could not resolve Release ${bold(release_name)}`)

		process.exit(-1)
	}
}
