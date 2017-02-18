/* @flow */

var exists = require('fs-sync').exists

var Requisite = require('./Requisite')
var Composite = require('./Composite')
var Directory = require('./Directory')

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
	, Composite([ Directory() ].concat(targets)))
}
