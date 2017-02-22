/* @flow */
/* ::

type ProdWatch
=   string
| [ string | string[] ]
| [ string | string[], Object ];

*/

var noop = () => {}

var bold = require('cli-color').bold

var Promise = require('bluebird')

var watch = require('chokidar').watch
var match = require('anymatch')

var debounce  = require('debounce')
var debounced = (fn) => debounce(fn, 250)

var producer = require('../producer')

var Artifact = require('./Artifact')

module.exports = function Watch
/* ::
<
	SrcEnv: EnvInOut,
	WatchEnv: SrcEnv & EnvOnce & EnvPrinter & EnvNotify,
	Env: EnvEntry & WatchEnv
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

	var art = Artifact((env /* :WatchEnv */) =>
	{
		$src(env)
		.then(src_gen =>
		{
			var options /* :Object */ = {}
			var src /* :string */
			var src_first /* :string */

			if (typeof src_gen === 'string')
			{
				src = src_gen
				src_first = src
			}
			else
			{
				src = src_gen[0]
				src_first = src

				if (Array.isArray(src))
				{
					src_first = src[0]
				}

				options = Object.assign({}, options, src_gen[1])
			}

			options.ignored = [].concat(options.ignored)

			options.ignored = options.ignored.concat(recursion_indicator(env))
			options.ignored = options.ignored.concat(env.src('release/**'))
			options.ignored = options.ignored.concat(env.src('node_modules/**'))

			options.ignored = options.ignored.filter(Boolean)

			release()
			$watch = watch(env.src(src_first), options)

			$watch.on('all', debounced(not_ignored(next)))

			function not_ignored (fn)
			{
				return (event, path) =>
				{
					if (match(src, path))
					{
						return fn(event, path)
					}
				}
			}
		})

		function next (event, path)
		{
			path = env.src.relative(path)

			var $env = Object.assign({}, env, { entry: path })

			/* @flow-off */
			target.construct($env)
			.then(ok, nag)
			.then(once)
		}

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

		function once ()
		{
			if (env.once)
			{
				return art.disengage()
			}
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

function recursion_indicator (env /* :EnvInOut */)
{
	return env.dst()
}
