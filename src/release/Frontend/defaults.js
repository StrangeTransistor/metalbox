/* @flow */

var assign = Object.assign

var Defaults = require('../../artifact/Defaults')

module.exports = function defaults
(
	aux /* :Object */,
	release /* :T_Release<*> */
)
{
	var defaults = assign({ buckets_path: 'buckets' }, aux)

	return Defaults(defaults, release)
}
