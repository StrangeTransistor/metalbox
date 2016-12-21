/* @flow */

// TODO rm overlap-artifact:
var Artifact /* :Function */ = require('./Artifact')

var run_seq = require('bluebird').reduce

module.exports = function Composite (targets /* :Array<Artifact> */)
	/* :Artifact */
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
