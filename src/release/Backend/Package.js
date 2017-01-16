/* @flow */

var read  = require('fs-sync').readJSON

var File = require('../../artifact/File')

var dump = require('../../json/dump')

module.exports = function Package /* ::<Env: EnvRelease>*/ ()
	/* :T_Artifact<Env> */
{
	return File('package.json', env =>
	{
		var manifest = read(env.src('package.json'))

		delete manifest.devDependencies

		manifest.scripts = manifest['scripts:prod']
		delete manifest['scripts:prod']

		return dump(manifest)
	})
}
