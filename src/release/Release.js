/* @flow */

var exists = require('fs-sync').exists

var Requisite = require('../artifact/Requisite')
var Composite = require('../artifact/Composite')

module.exports
= function Release /* ::<Env: EnvRelease> */
(
	targets /* :Array<T_Artifact<*>> */
)
/* :T_Release<Env> */
{
	return Requisite(env =>
	{
		if (! exists(env.in()))
		{
			throw new Error('source dir (in) not exists')
		}
	}
	, Composite(targets))
}
