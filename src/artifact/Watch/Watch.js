/* @flow */
/* ::

export type ProdWatch<Env> = WeakProductable<Env & EnvInOut, string | string[]>;

export type WatchEnv = EnvInOut & EnvOnce & EnvPrinter & EnvNotify;

export type Options =
{
	debounce?: boolean
};

*/

var noop = () => {}

var bold = require('cli-color').bold

var Promise = require('bluebird')
var resolve = Promise.resolve

var watch = require('chokidar').watch
var match = require('anymatch')

var debounce  = require('debounce')
var debounced = (fn) => debounce(fn, 250)

var producer = require('../../producer')
var glob_resolve = require('../../glob-resolve')

var Artifact = require('../Artifact')

module.exports = function Watch
/* ::
<
	Env: Object,
	REnv: Env & WatchEnv
>
*/
(
	prod_watch_src /* :ProdWatch<Env> */,
	target         /* :T_Artifact<Env & EnvEntry> */,
	options        /* ::?: Options */
)
	/* :T_Artifact<REnv> */
{
	var $src = producer(prod_watch_src)

	var $watch    = null
	var $deferred = noop

	var $options = Object.assign({ debounce: false }, options)

	var art = Artifact((env /* :REnv */) =>
	{
		if (env.once)
		{
			return resolve()
		}

		$src(env)
		.then(src_gen =>
		{
			var src /* :string[] */ = [].concat(src_gen)

			src = glob_resolve(env.src(), src)

			var ignored =
			[
				env.dst(),
				env.src('release/**'),
				env.src('node_modules/**'),
			]

			release()

			$watch = watch(env.src(src[0]), { ignored: ignored })

			var $next = not_ignored(next)

			if ($options.debounce)
			{
				$next = debounced($next)
			}

			$watch.on('all', $next)

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
