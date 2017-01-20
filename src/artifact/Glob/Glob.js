/* @flow */
/* ::

import T_Rootpath from 'rootpath';

type F_Do<Env> =
(
	src:  T_Rootpath,
	path: string,
	dst:  T_Rootpath,
	env: Env
)
=> WeakResolution;

*/

var method = require('bluebird').method
var join   = require('bluebird').join
var map    = require('bluebird').mapSeries

var find = require('globule').find
var glob__join = require('globjoin')

var producer = require('../../producer')

var Artifact = require('../Artifact')

module.exports = function Glob /* ::<Env: EnvIn & EnvOut>*/
(
	prod_src  /* :WeakProductable<Env, string> */,
	glob      /* :string | string[] */,
	prod_dst  /* :WeakProductable<Env, string> */,
	do_fn     /* :F_Do<Env> */
)
	/* :T_Artifact<Env> */
{
	var $src = producer(prod_src)
	var $dst = producer(prod_dst)

	var $do = method(do_fn)

	var art = Artifact(env =>
	{
		return join($src(env), $dst(env), (src, dst) =>
		{
			var r_src = env.src.partial(src)
			var r_dst = env.dst.partial(dst)

			var globs = [].concat(glob)
			globs = globs.map(glob => glob__join(r_src(), glob))

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
		return `[Glob ${String(glob)}]`
	}

	return art
}
