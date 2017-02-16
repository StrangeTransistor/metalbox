/* @flow */

var method = require('bluebird').method

module.exports = function producer /* ::<Env, T> */
(prod /* :WeakProductable<Env, T> */)
	/* :Producer<Env, T> */
{
	if (typeof prod === 'function')
	{
		return method(prod)
	}
	else
	{
		var atom /* :T */ = prod
		return method(() => atom)
	}
}
