/* @flow */

var Composite = require('../artifact/Composite')

module.exports
= function Release /* ::<Env: EnvRelease> */
(
	targets /* :Array<T_Artifact<*>> */
)
/* :T_Release<Env> */
{
	return Composite(targets)
}
