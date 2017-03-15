/* @flow */

var Rootpath = require('rootpath')

var With = require('../../artifact/With')
var Composite = require('../../artifact/Composite')

var Directory = require('../../artifact/Directory')
var Glob = require('../../artifact/Glob')
var Copy = require('../../artifact/Copy')

var glob = '**/*.@(pug|less|css|js)'

module.exports = function ()
	/* :T_Artifact<EnvOut> */
{
	return From('frontend', Composite(
	[
		/* @flow-off weird escalation Directory<> */
		(Directory() /* :T_Artifact<EnvOut> */),
		Glob('', glob, '', Copy(), { exclude_recursive: false }),
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
