/* @flow */

var dump_it = JSON.stringify

module.exports = (it /* :any */) =>
{
	return dump_it(it, null, '  ') + '\n'
}
