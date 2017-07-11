/* @flow */

var join = require('path').join

var find = require('lodash/find')

var Artifact = require('../../artifact/Artifact')
var File = require('../../artifact/File')

var WithPackage = require('../../producer/WithPackage')

var from_targets = require('./rollup-targets')

module.exports = function Package /* ::<Env: EnvRelease>*/ ()
	/* :T_Artifact<Env> */
{
	return Artifact(env =>
	{
		var targets = from_targets(env)

		var node   = find(targets, such => such[0] === 'node')
		var jsnext = find(targets, such => such[0] === 'jsnext')

		return File('package.json', WithPackage(manifest =>
		{
			delete manifest.metalbox

			var base = manifest.main || ''
			var main_jsnext

			if (node)
			{
				manifest.main = join(node[1], base)
			}

			if (jsnext)
			{
				var main_jsnext = join(jsnext[1], base)

				manifest['jsnext:main'] = main_jsnext
				manifest.module = main_jsnext
			}

			return manifest
		}))
		.construct(env)
	})
}
