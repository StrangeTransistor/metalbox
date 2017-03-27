/* @flow */
/* ::

type EnvCopy = EnvEntryEvent | EnvEntry;

export type Options =
{
	unlink?: boolean
};

*/

var assign = Object.assign

var cp = require('fs-sync').copy
var rm = require('fs-sync').remove

var Artifact = require('./Artifact')

module.exports = function Copy /* ::<Env: EnvInOut & EnvCopy> */
(options /* ::?:Options */)
{
	options = assign({ unlink: true }, options)

	return Artifact((env /* :Env */) =>
	{
		/* @flow-off */
		if (env.event && (env.event === 'unlink'))
		{
			/* @flow-off */
			if (options.unlink)
			{
				// console.log('RM', env.dst(env.entry))
				rm(env.dst(env.entry))
			}
		}
		else
		{
			// console.log('+', env.src(env.entry), env.dst(env.entry))
			cp(env.src(env.entry), env.dst(env.entry), { force: true })
		}
	})
}
