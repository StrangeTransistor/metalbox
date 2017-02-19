/* @flow */

var find_package = require('./_/manifest-shortcut')
var resolve = require('./_/resolve-shortcut')
var run_sealed = require('./_/run-sealed')

module.exports = (release_name /* :string */, yargv /* :yargv */) =>
{
	var f = find_package()

	var rootpath = f[0]
	var manifest = f[1]

	var Artifact /* :() => T_Artifact<any> */ = resolve(rootpath, release_name)

	run_sealed(Artifact,
	{
		options: {},
		manifest: manifest,
		rootpath: rootpath,
		preset_name: release_name,
		yargv: yargv
	})
}
