/* @flow */

var Defaults = require('../../artifact/Defaults')

module.exports = function defaults (release /* :T_Release<*> */)
{
	return Defaults({ buckets_path: 'buckets' }, release)
}
