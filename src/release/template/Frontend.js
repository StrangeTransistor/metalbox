/* @flow */

var Rootpath = require('rootpath')

var With = require('../../artifact/With')
var Composite = require('../../artifact/Composite')

var Directory = require('../../artifact/Directory')
var Copy = require('../../artifact/Glob/Copy') // TODO Glob(Copy())

var glob = '**/*.@(pug|less|css|js)'

module.exports = function ()
	/* :T_Artifact<EnvOut> */
{
	return From('frontend', Composite(
	[
		Directory(),
		Copy('', glob, '', { exclude_recursive: false }),
	]))
}

function From (template_dir /* :string */, target /* :T_Artifact<EnvInOut> */)
	/* :T_Artifact<EnvOut> */
{
	return With(target, (env /* :EnvOut */) =>
	{
		return Object.assign({}, env,
		{
			src: Rootpath(__dirname, '../../../templates/', template_dir)
		})
	})
}
