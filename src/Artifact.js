/* @flow */

var resolver = require('bluebird').method

module.exports
= function Artifact
(
	do_construct /* :DoConstruct */
)
	/* :Artifact */
{
	var artifact = {}

	artifact.construct = resolver(do_construct)

	return artifact
}
