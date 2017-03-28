/* @flow */

var rm = require('fs-sync').remove

var Proxy = require('./Proxy')

module.exports = function Remover /* ::
<
	Env:  EnvEntry,
	REnv: Env & EnvOut & EnvEntryEvent
>
*/
(
	target /* :T_Artifact<Env> */
)
	/* :T_Artifact<REnv> */
{
	return Proxy(target,
	(construct /* :Resolver<Env> */) /* :WeakResolver<REnv> */ =>
	{
		return (env /* :REnv */) =>
		{
			if (env.event === 'unlink')
			{
				rm(env.dst(env.entry))
			}
			else
			{
				return construct(env)
			}
		}
	})
}
