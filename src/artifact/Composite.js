/* @flow */

var noop = () => {}

var Artifact = require('./Artifact')

var all = require('bluebird').all
var run_seq = require('bluebird').reduce

module.exports = function Composite /* ::<Env> */
(
	targets /* :Array<T_Artifact<*>> */
)
	/* :T_Artifact<Env> */
{
	var art = Artifact(env =>
	{
		return run_seq(targets, (_, next) =>
		{
			return next.construct(env)
		}
		, null)
		.then(noop)
	})

	art.disengage = () =>
	{
		return all(targets.map(target => target.disengage()))
		.then(noop)
	}

	return art
}
