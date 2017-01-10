/* @flow */

var attempt = require('bluebird').try

var Artifact = require('./Artifact')

module.exports = function Preset /* ::<Env: EnvRelease> */
(
	prod_env       /* :WeakProducer<Process, Env> */,
	target_release /* :T_Release<Env> */
)
	/* :Product<T_Preset> */
{
	return attempt(() => prod_env(process))
	.then(env =>
	{
		return Artifact(() =>
		{
			return target_release.construct(env)
			// TODO generic Proxy required
		})
	})
}
