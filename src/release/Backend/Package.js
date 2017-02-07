/* @flow */

var File = require('../../artifact/File')
var WithPackage = require('../../producer/WithPackage')

module.exports = function Package /* ::<Env: EnvRelease>*/ ()
	/* :T_Artifact<Env> */
{
	return File('package.json', WithPackage(manifest =>
	{
		delete manifest.metalbox
		delete manifest.devDependencies

		delete manifest.scripts
		if (manifest['scripts:battle'])
		{
			manifest.scripts = manifest['scripts:battle']
			delete manifest['scripts:battle']
		}

		return manifest
	}))
}
