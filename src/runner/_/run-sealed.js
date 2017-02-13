/* @flow */

var With = require('../../artifact/With')

var Printer = require('../../printer')

var make_env = require('./make-env')
var output   = require('./output')

/* ::

export type SealedEnv =
{
	options: ?Object,
	manifest: Object,
	rootpath: T_Rootpath,
	preset_name: string,
	yargv: yargv
};

*/

module.exports = function
(
	Artifact /* :() => T_Artifact<*> */,
	pre_env  /* :SealedEnv */
)
{
	var preset_name = pre_env.preset_name

	var printer = Printer(process.stdout)

	var sealed_artifact = With(Artifact(), () =>
	{
		var env = Object.assign({}, pre_env, { printer: printer })

		return make_env(env)
	})

	output(printer, preset_name, sealed_artifact.construct())
	.finally(process.exit)
}
