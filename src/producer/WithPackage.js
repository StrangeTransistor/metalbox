/* @flow */

var method = require('bluebird').method

var read  = require('fs-sync').readJSON

var dump = require('../json/dump')

module.exports = function Package /* ::<Env: EnvIn> */
(
	do_transform /* :WeakProducer<Object, Object> */
)
	/* :Producer<Env, string> */
{
	var $do_transform = method(do_transform)

	return (env /* :Env*/) =>
	{
		var manifest = read(env.src('package.json'))

		return $do_transform(manifest)
		.then(dump)
	}
}
