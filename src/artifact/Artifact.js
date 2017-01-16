/* @flow */

var resolve  = require('bluebird').resolve
var resolver = require('bluebird').method

module.exports
= function Artifact /* ::<Env> */
(
	do_construct /* :WeakResolver<Env> */
)
	/* :T_Artifact<Env> */
{
	var artifact = {}

	artifact.construct = resolver(do_construct)

	artifact.disengage = () => resolve()

	artifact.describe  = () => '[Artifact]'

	// TODO Artifact tree, construct result (timings), etc

	return artifact
}
