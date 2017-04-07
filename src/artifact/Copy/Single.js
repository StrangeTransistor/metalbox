/* @flow */

var cp = require('fs-sync').copy

var join = require('bluebird').join

var Artifact = require('../Artifact')

var producer = require('../../producer')

module.exports = function Copy /* ::<Env: EnvInOut> */
(
	prod_src /* :WeakProductable<Env, string> */,
	prod_dst /* ::?:WeakProductable<Env, string> */
)
	/* :T_Artifact<Env> */
{
	var $src = producer(prod_src)

	if (prod_dst)
	{
		var $dst = producer(prod_dst)
	}
	else
	{
		var $dst = producer(prod_src)
	}

	return Artifact(env =>
	{
		return join($src, $dst, (src, dst) =>
		{
			cp(env.src(src), env.dst(dst), { force: true })
		})
	})
}
