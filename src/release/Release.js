/* @flow */

var exists = require('fs-sync').exists

var Requisite = require('../artifact/Requisite')
var Composite = require('../artifact/Composite')
var Directory = require('../artifact/Directory')

module.exports
= function Release /* ::<Env: EnvRelease> */
(
	targets /* :Array<T_Artifact<*>> */
)
/* :T_Release<Env> */
{
	return Requisite(env =>
	{
		if (! exists(env.src()))
		{
			throw new Error('source dir (src) not exists')
		}
	}
	, Composite([ Directory('') ].concat(targets)))
}
