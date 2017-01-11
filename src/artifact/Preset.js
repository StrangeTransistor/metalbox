/* @flow */

var method = require('bluebird').method

var Proxy = require('./Proxy')

module.exports = function Preset /* ::<Env: EnvRelease> */
(
	prod_env       /* :WeakProducer<Process, Env> */,
	target_release /* :T_Release<Env> */
)
	/* :Producer<Process, T_Preset> */
{
	var $prod_env = method(prod_env)

	return (process) =>
	{
		return $prod_env(process)
		.then(env =>
		{
			var art = Proxy(target_release, construct =>
			{
				return () =>
				{
					return construct(env)
				}
			})

			art.describe = () =>
			{
				return `[Preset of ${target_release.describe()}]`
			}

			return art
		})
	}
}
