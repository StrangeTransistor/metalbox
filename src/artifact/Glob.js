/* @flow */

var join = require('bluebird').join

var find = require('globule').find
var cp = require('fs-sync').copy

var producer = require('../producer')

var Artifact = require('./Artifact')

module.exports = function Glob /* ::<Env: EnvRelease>*/
(
	prod_src  /* :WeakProductable<Env, string> */,
	glob      /* :string | string[] */,
	prod_dst  /* :WeakProductable<Env, string> */
)
	/* :T_Artifact<Env> */
{
	var $src = producer(prod_src)
	var $dst = producer(prod_dst)

	var art = Artifact(env =>
	{
		return join($src(env), $dst(env), (src, dst) =>
		{
			var r_src = env.src.partial(src)
			var r_dst = env.dst.partial(dst)

			find(r_src(glob))
			.map(path => r_src.relative(path))
			.map(path =>
			{
				cp(r_src(path), r_dst(path), { force: true })
			})
		})
	})

	art.describe = () =>
	{
		return `[Glob ${String(glob)}]`
	}

	return art
}
