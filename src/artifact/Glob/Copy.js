/* @flow */

var cp = require('fs-sync').copy

var Glob = require('./Glob')

/* ::

import type { Options } from './Glob';

*/

module.exports = function Copy /* ::<Env> */
(
	prod_src  /* :WeakProductable<Env, string>            */,
	prod_glob /* :WeakProductable<Env, string | string[]> */,
	prod_dst  /* :WeakProductable<Env, string>            */,
	options   /* :?Options */
)
	/* T_Artifact<Env> */
{
	return Glob(prod_src, prod_glob, prod_dst, (src, path, dst) =>
	{
		return cp(src(path), dst(path), { force: true })
	}
	, options)
}
