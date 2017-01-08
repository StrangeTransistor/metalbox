/* @flow */

var noop = () => {}

var Promise = require('bluebird')
var Never   = () => new Promise(noop)

var watch = require('chokidar').watch

var debounce  = require('debounce')
var debounced = (fn) => debounce(fn, 250)

var producer = require('../producer')

var Artifact = require('./Artifact')

module.exports = function Watch /* ::<WEnv: EnvRelease, Env> */
(
	prod_watch_src /* :WeakProductable<Env, string> */,
	target         /* :T_Artifact<Env> */
)
	/* :T_Artifact<WEnv & Env> */
{
	var $src = producer(prod_watch_src)

	console.log('init')

	return Artifact(env =>
	{
		$src(env)
		.then(watch_src =>
		{
			console.log(env.src(watch_src))

			watch(env.src(watch_src))
			.on('all', debounced(() =>
			{
				console.info('~')

				target.construct(env)
				.then(noop, noop)
			}))
		})

		return Never()
	})
}
