/* @flow */
/* deprecated, use Glob(…, Copy()) */

var Copy = require('../Copy')
var Glob = require('./Glob')

module.exports = function GlobCopy /* ::<Env> */
(
	prod_src  /* :WeakProductable<Env, string>            */,
	prod_glob /* :WeakProductable<Env, string | string[]> */,
	prod_dst  /* :WeakProductable<Env, string>            */
)
	/* T_Artifact<Env> */
{
	return Glob(prod_src, prod_glob, prod_dst, Copy())
}
