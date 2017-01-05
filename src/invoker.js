/* @flow */
/* ::
	type ProductOrProducer<
		Env,
		T,
		TF: WeakProducer<Env, T>,
		TP: WeakProduct<T>
		>
			= TF | TP;
*/

var method = require('bluebird').method

module.exports = function invoker /* ::<Env, T> */
(prod /* :ProductOrProducer<Env, T, *, *> */)
	/* :Producer<Env, T> */
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
