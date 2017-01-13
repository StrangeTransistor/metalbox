/* @flow */

var With = require('../../artifact/With')

module.exports = function defaults (release /* :T_Release<*> */)
{
	return With(release, env =>
	{
		return Object.assign({}, { buckets_path: 'buckets' }, env)
	})
}
