/* @flow */
/* ::

type Proxify<Env, ProxyEnv>
= (do_construct: Resolver<Env>) => Resolver<ProxyEnv>;

*/

var Artifact = require('./Artifact')

module.exports = function Proxy /* ::<Env, ProxyEnv> */
(
	target  /* :T_Artifact<Env> */,
	proxify /* :Proxify<Env, ProxyEnv> */
)
	/* :T_Artifact<ProxyEnv> */
{
	var art = Artifact(proxify(target.construct))

	art.disengage = () =>
	{
		return target.disengage()
	}

	art.describe = () =>
	{
		return `[Proxy to ${target.describe()}]`
	}

	return art
}
