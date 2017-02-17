/* @flow */

var findRoot = require('find-root')
var Rootpath = require('rootpath')

var resolve = require('./_/resolve-shortcut')
var run_sealed = require('./_/run-sealed')

module.exports = (template_name /* :string */, yargv /* :yargv */) =>
{
	var rootpath = Rootpath(findRoot(process.cwd()))

	var Artifact /* :() => T_Artifact<any> */ = resolve(rootpath, template_name)

	run_sealed(Artifact,
	{
		options:  {},
		manifest: {},
		rootpath: rootpath,
		preset_name: template_name,
		yargv: yargv
	})
}
