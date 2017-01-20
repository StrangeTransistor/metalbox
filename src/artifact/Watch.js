/* @flow */
/* ::

type ProdWatch
= string
| [ string | string[], Object ];

*/

var noop = () => {}

var bold = require('cli-color').bold

var Promise = require('bluebird')

var watch = require('chokidar').watch

var debounce  = require('debounce')
var debounced = (fn) => debounce(fn, 250)

var producer = require('../producer')

var Artifact = require('./Artifact')

module.exports = function Watch
/* ::
<
	Env: { entry?: string },
	SrcEnv: EnvIn & EnvOut,
	WatchEnv: Env & SrcEnv & EnvPrinter & EnvNotify
>
*/
(
	prod_watch_src /* :WeakProductable<SrcEnv, ProdWatch> */,
	target         /* :T_Artifact<Env> */
)
	/* :T_Artifact<WatchEnv> */
{
	var $src = producer(prod_watch_src)

	var $watch    = null
	var $deferred = noop

	var art = Artifact(env =>
	{
		$src(env)
		.then(watch_src =>
		{
			var src /* :string */
			var options /* :Object */ = {}

			if (typeof watch_src === 'string')
			{
				src = watch_src
			}
			else
			{
				src     = watch_src[0]
				options = Object.assign({}, options, watch_src[1])
			}

			options.ignored = [].concat(options.ignored, env.dst())
			options.ignored = options.ignored.filter(Boolean)

			release()
			$watch = watch(env.src(src), options)

			$watch.on('all', debounced((event, path) =>
			{
				path = env.src.relative(path)

				// crazy
				env.entry = path
				// TODO:
				// var $env /* :Env */ = Object.assign({}, env, { entry: path })

				target.construct(env)
				// target.construct($env)
				.then(ok, nag)
			}))
		})

		function ok ()
		{
			env.printer.write(` ${bold('~')} ${target.describe()}`)
			env.notifier.obstacle(target.describe(), null)
		}

		function nag (error)
		{
			env.printer.write(
				` ${bold('~')} ${target.describe()}` +
				` ${bold.red('ERROR:')} ${error.message}`
			)

			env.printer.detail(error)

			env.notifier.obstacle(target.describe(), error.message)
		}

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
