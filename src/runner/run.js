/* @flow */

var findRoot = require('find-root')
var Rootpath = require('rootpath')

var resolve = require('./_/resolve-shortcut')

module.exports = (release_name /* :string */, yargv /* :yargv */) =>
{
	var rootpath = Rootpath(findRoot(process.cwd()))

	var Artifact /* :() => T_Artifact<any> */ = resolve(rootpath, release_name)

	console.log(Artifact)
	console.log(yargv)
}
