/* @flow */

var method  = require('bluebird').method
var resolve = require('bluebird').resolve

module.exports
= function Artifact /* ::<Env> */
(
	do_construct /* :WeakResolver<Env> */
)
	/* :T_Artifact<Env> */
{
	var artifact = {}

	artifact.construct = method(do_construct)

	artifact.disengage = () => resolve()

	artifact.describe  = () => '[Artifact]'

	// TODO(v2) Artifact tree, construct result (timings), etc

	return artifact
}
