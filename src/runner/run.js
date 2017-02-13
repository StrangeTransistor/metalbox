/* @flow */

var findRoot = require('find-root')
var Rootpath = require('rootpath')

var load = require('fs-sync').readJSON

var resolve = require('./_/resolve-shortcut')
var run_sealed = require('./_/run-sealed')

module.exports = (release_name /* :string */, yargv /* :yargv */) =>
{
	var rootpath = Rootpath(findRoot(process.cwd()))

	var manifest = load(rootpath('package.json'))

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
