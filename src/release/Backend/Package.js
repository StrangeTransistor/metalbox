/* @flow */

var File = require('../../artifact/File')
var WithPackage = require('../../producer/WithPackage')

module.exports = function Package /* ::<Env: EnvRelease>*/ ()
	/* :T_Artifact<Env> */
{
	return File('package.json', WithPackage(manifest =>
	{
		delete manifest.devDependencies

		manifest.scripts = manifest['scripts:prod']
		delete manifest['scripts:prod']

		return manifest
	}))
}
