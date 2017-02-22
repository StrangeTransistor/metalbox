/* @flow */
/* ::

type F_Do<Env> =
(
	src:  T_Rootpath,
	path: string,
	dst:  T_Rootpath,
	env: Env
)
=> WeakResolution;

export type Options =
{
	exclude_recursive?: boolean,
	exclude_node_modules?: boolean
};

*/

var method = require('bluebird').method
var join   = require('bluebird').join
var map    = require('bluebird').mapSeries

var find = require('globule').find
var glob__join = require('globjoin')

var producer = require('../../producer')

var Artifact = require('../Artifact')

/* eslint-disable max-params */
module.exports = function Glob /* ::<Env: EnvInOut>*/
(
	prod_src  /* :WeakProductable<Env, string>            */,
	prod_glob /* :WeakProductable<Env, string | string[]> */,
	prod_dst  /* :WeakProductable<Env, string>            */,
	do_fn     /* :F_Do<Env> */,
	options   /* :?Options */
)
	/* :T_Artifact<Env> */
{
	/* eslint-enable max-params */
	var $src  = producer(prod_src)
	var $dst  = producer(prod_dst)
	var $glob = producer(prod_glob)
	var $do   = method(do_fn)

	var $options = Object.assign(
	{
		exclude_recursive: true,
		exclude_node_modules: true,
	}
	, options)

	var art = Artifact(env =>
	{
		return join($src(env), $glob(env), $dst(env), (src, glob, dst) =>
		{
			var r_src = env.src.partial(src)
			var r_dst = env.dst.partial(dst)

			var globs = [].concat(glob)

			if ($options.exclude_node_modules)
			{
				globs = globs.concat('!**/node_modules/**')
			}
			if ($options.exclude_recursive)
			{
				globs = globs.concat('!release/**')
			}

			globs = globs.map(glob => glob__join(r_src(), glob))

			if ($options.exclude_recursive)
			{
				globs = globs.concat(recursion_indicator(env))
			}

			var paths = find(globs)
			.map(path => r_src.relative(path))

			return map(paths, path =>
			{
				return $do(r_src, path, r_dst, env)
			})
			.then(() => {})
		})
	})

	art.describe = () =>
	{
		var $glob = ''
		if (typeof prod_glob === 'string')
		{
			$glob = ' ' + prod_glob
		}

		return `[Glob${$glob}]`
	}

	return art
}

function recursion_indicator (env /* :EnvInOut */)
{
	return '!' + env.dst('**')
}