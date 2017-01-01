/* @flow */

var slice = [].slice

var reduce = require('bluebird').reduce

module.exports = function Pipeline /* ::<Env, T> */
(
	src /* :WeakProducer<Env, T> */
	/* ::, ...pipes :Array<any> */
)
/* :Producer<Env, T> */
{
	var pipes = slice.call(arguments, 1)

	return function (env)
	{
		return reduce(pipes, (memo, next) =>
		{
			return next(memo, env)
		},
		src(env))
	}
}
