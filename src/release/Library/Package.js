/* @flow */

var join = require('path').join

var File = require('../../artifact/File')
var WithPackage = require('../../producer/WithPackage')

module.exports = function Package /* ::<Env: EnvRelease>*/ ()
	/* :T_Artifact<Env> */
{
	return File('package.json', WithPackage(manifest =>
	{
		delete manifest.metalbox

		var main = manifest.main || ''

		manifest.main = join('dist', main)

		if (main)
		{
			manifest['jsnext:main'] = main
		}

		return manifest
	}))
}
