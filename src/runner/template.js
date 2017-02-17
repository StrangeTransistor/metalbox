/* @flow */

var Rootpath = require('rootpath')

var resolve = require('./_/resolve-shortcut')
var run_sealed = require('./_/run-sealed')

module.exports = (template_name /* :string */, yargv /* :yargv */) =>
{
	var rootpath = Rootpath(process.cwd())

	var Artifact /* :() => T_Artifact<any> */ = resolve(rootpath, template_name)

	run_sealed(Artifact,
	{
		options:
		{
			dst: rootpath,
		},
		rootpath: rootpath,
		preset_name: template_name,
		yargv: yargv,
	})
}
