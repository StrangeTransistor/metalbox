/* @flow */

var Artifact = require('./Artifact')

var run_seq = require('bluebird').reduce

module.exports = function Composite (targets /* :Array<T_Artifact> */)
	/* :T_Artifact */
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
