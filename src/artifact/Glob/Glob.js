/* @flow */

var Glob = require('./Fn')

/* ::

import type { Options } from './Fn'

*/

/* eslint-disable max-params */
module.exports = function Rule /* ::<Env: EnvInOut> */
(
	prod_src  /* :WeakProductable<Env, string>            */,
	prod_glob /* :WeakProductable<Env, string | string[]> */,
	prod_dst  /* :WeakProductable<Env, string>            */,
	target    /* :T_Artifact<Env & EnvEntry> */,
	options   /* :?Options */
)
	/* :T_Artifact<Env> */
{
	/* eslint-enable max-params */
	return Glob(prod_src, prod_glob, prod_dst, (src, entry, dst, env) =>
	{
		var $env = Object.assign({}, env,
		{
			src: src,
			dst: dst,
			entry: entry
		})

		return target.construct($env)
	}
	, options)
}
