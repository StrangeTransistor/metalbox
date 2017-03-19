/* @flow */
/* ::

import type { ProdWatch, WatchEnv } from './Watch'

*/

var Composite = require('../Composite')

var Watch = require('./Watch')

module.exports = function Heat /* ::<Env: Object> */
(
	prod_watch_src /* :ProdWatch<Env> */,
	target         /* :T_Artifact<Env> */
)
	/* :T_Artifact<Env & WatchEnv> */
{
	return Composite(
	[
		target,
		Watch(prod_watch_src, target)
	])
}
