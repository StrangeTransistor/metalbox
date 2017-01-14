/* @flow */

var Artifact = require('../../artifact/Artifact')

var Release = require('../../artifact/Release')

module.exports = function Backend /* ::<Env: EnvRelease & EnvPrinter> */ ()
	/* :T_Release<Env> */
{
	return Release(
	[
		Artifact((env /* :EnvPrinter */) =>
		{
			env.printer.detail(env)
		})
	])
}
