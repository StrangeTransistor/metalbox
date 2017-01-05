/* @flow */
/* ::
	type ProductOrProducer<T, TP: WeakProduct<T>> = (() => TP) | TP;
*/

var method = require('bluebird').method

module.exports = function invoker /* ::<T> */
(prod /* :ProductOrProducer<T, *> */)
	/* :() => Product<T> */
{
	if (typeof prod === 'function')
	{
		return method(prod)
	}
	else
	{
		var prod_atom /* :T */ = prod
		return method(() => prod_atom)
	}
}
