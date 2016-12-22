/* @flow */

var resolver = require('bluebird').method

module.exports
= function Artifact /* ::<Env> */
(
	do_construct /* :(env: Env) => Bluebird$Promisable<void> */
)
	/* :T_Artifact<Env> */
{
	var artifact = {}

	artifact.construct = resolver(do_construct)

	return artifact
}
