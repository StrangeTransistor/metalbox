/* @flow */

var noop = () => {}

var Promise = require('bluebird')

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

	var $watch    = null
	var $deferred = noop

	var art = Artifact(env =>
	{
		$src(env)
		.then(watch_src =>
		{
			release()
			$watch = watch(env.src(watch_src))

			$watch.on('all', debounced(() =>
			{
				console.info('~')

				target.construct(env)
				.then(noop, noop)
			}))
		})

		return new Promise(rs =>
		{
			$deferred = rs
		})
	})

	art.disengage = () =>
	{
		release()

		return target.disengage()
	}

	function release ()
	{
		if ($watch)
		{
			$watch.unwatch()
			$watch.close()

			$deferred()
			$deferred = noop
			$watch    = null
		}
	}

	return art
}
