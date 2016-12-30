/* @flow */

var Artifact = require('./Artifact')

var run_seq = require('bluebird').reduce

module.exports = function Composite /* ::<Env> */
(
	targets /* :Array<T_Artifact<*>> */
)
	/* :T_Artifact<Env> */
{
	return Artifact(env =>
	{
		return run_seq(targets, (_, next) =>
		{
			return next.construct(env)
		}
		, null)
		.then(() => {})
	})
}
