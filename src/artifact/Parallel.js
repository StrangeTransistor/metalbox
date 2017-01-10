/* @flow */

var noop = () => {}

var Artifact = require('./Artifact')

var map = require('bluebird').map

module.exports = function Composite /* ::<Env> */
(
	targets /* :Array<T_Artifact<*>> */
)
	/* :T_Artifact<Env> */
{
	var art = Artifact(env =>
	{
		return map(targets, target => target.construct(env))
		.then(noop)
	})

	art.disengage = () =>
	{
		return map(targets, target => target.disengage())
		.then(noop)
	}

	return art
}
