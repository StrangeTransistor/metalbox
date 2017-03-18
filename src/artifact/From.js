/* @flow */

var rootpath = require('rootpath')

var With = require('./With')

module.exports = function From
(
	template_dir /* :string */,
	target /* :T_Artifact<EnvInOut> */
)
	/* :T_Artifact<EnvOut> */
{
	return With(target, (env /* :EnvOut */) =>
	{
		return Object.assign({}, env,
		{
			src: rootpath(__dirname, '../../templates/', template_dir)
		})
	})
}
