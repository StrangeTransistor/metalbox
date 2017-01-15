/* @flow */

var cp = require('fs-sync').copy

var Glob = require('./Glob')

module.exports = function Copy /* ::<Env> */
(
	prod_src  /* :WeakProductable<Env, string> */,
	glob      /* :string | string[] */,
	prod_dst  /* :WeakProductable<Env, string> */
)
	/* T_Artifact<Env> */
{
	return Glob(prod_src, glob, prod_dst, (src, path, dst) =>
	{
		return cp(src(path), dst(path), { force: true })
	})
}
