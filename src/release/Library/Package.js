/* @flow */

var File = require('../../artifact/File')
var WithPackage = require('../../producer/WithPackage')

module.exports = function Package /* ::<Env: EnvRelease>*/ ()
	/* :T_Artifact<Env> */
{
	return File('package.json', WithPackage(manifest =>
	{
		// TODO better
		manifest.main = 'dist/'
		manifest['jsnext:main'] = ''

		return manifest
	}))
}
