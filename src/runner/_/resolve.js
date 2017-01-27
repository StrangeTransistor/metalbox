/* @flow */

var Rootpath = require('rootpath')

var dynamic_require = (require /* :(string) => () => T_Artifact<any> */)

module.exports = function resolve
(
	rootpath_client /* :T_Rootpath */,
	release_name /* :string */
)
{
	try
	{
		/* RESOLVE relative to client package.json */
		var Artifact = dynamic_require(rootpath_client(release_name))
	}
	catch (e)
	{

	try
	{
		var rootpath_metalbox = Rootpath(__dirname, '..', '..', '..')

		/* RESOLVE in metalbox src/releases */
		var local_release = rootpath_metalbox('src/release/', release_name)

		var Artifact = dynamic_require(local_release)
	}
	catch (e)
	{
		throw new Error
	}
	}

	return Artifact
}
