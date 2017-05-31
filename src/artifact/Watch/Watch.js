/* @flow */
/* ::

export type ProdWatch<Env> = WeakProductable<Env & EnvInOut, string | string[]>;

export type WatchEnv = EnvInOut & EnvOnce & EnvPrinter & EnvNotify;

export type Options =
{
	debounce?: boolean,
	relative?: WeakProductable<EnvIn, string>,
	large?: boolean,
};

*/

var noop = () => {}

var bold = require('cli-color').bold

var Promise = require('bluebird')
var resolve = Promise.resolve
var join    = Promise.join

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
	target         /* :T_Artifact<Env & EnvEntryEvent> */,
	options        /* ::?: Options */
)
	/* :T_Artifact<REnv> */
{
	var $src = producer(prod_watch_src)

	var $watch    = null
	var $deferred = noop

	var $options = Object.assign(
	{
		debounce: false,
		relative: '',
		large: false,
	}
	, options)

	var $base = producer($options.relative)

	var art = Artifact((env /* :REnv */) =>
	{
		if (env.once)
		{
			return resolve()
		}

		join($src(env), $base(env), (src_gen, base_gen) =>
		{
			var src /* :string[] */ = [].concat(src_gen)

			src = glob_resolve(env.src(), src)

			var ignored =
			[
				dot(),
				env.dst(),
				env.src('release/**'),
				env.src('node_modules/**'),
			]

			release()

			var chokidar_options /* :Object */ =
			{
				ignored: ignored
			}

			if ($options.large)
			{
				chokidar_options.awaitWriteFinish = true
			}

			$watch = watch(env.src(src[0]), chokidar_options)

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

			function next (event, path)
			{
				var base = env.src.partial(base_gen)
				path = base.relative(path)

				var $env = Object.assign({}, env,
				{
					src: base,

					event: event,
					entry: path,
				})

				/* @flow-off */
				target.construct($env)
				.then(ok, nag)
				.then(once)
			}
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

	function dot ()
	{
		return /(^|[/\\])\../
	}

	return art
}
