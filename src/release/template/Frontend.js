/* @flow */

var Rootpath = require('rootpath')

var With = require('../../artifact/With')
var Composite = require('../../artifact/Composite')

var Directory = require('../../artifact/Directory')
var Copy = require('../../artifact/Glob/Copy')

// var Release  = require('../../artifact/Release')

var glob = '**/*.@(pug|less|css|js)'

module.exports = function /* ::<Env: EnvOut> */ ()
	/* :T_Artifact<Env> */
{
	var art = Composite(
	[
		Directory(''),
		Copy('', glob, '', { exclude_recursive: false }),
	])

	return With(art, env =>
	{
		var src_root = Rootpath(__dirname, '../../..')
		.partial('templates/frontend')

		return Object.assign({}, env, { src: src_root })
	})
}
