/* @flow */

var Artifact = require('./Artifact')

var run_seq = require('bluebird').reduce

module.exports = function Composite /* ::<T> */
(
	targets /* :Array<T_Artifact<T>> */
)
	/* :T_Artifact<T> */
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
