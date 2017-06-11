/* @flow */
/* :: import type { T_Rootpath } from 'rootpath' */

var assign = Object.assign

var With = require('../../artifact/With')

module.exports = function /* ::<Env> */
(target /* :T_Artifact<Env> */)
	/* :T_Artifact<Env & { buckets: T_Rootpath }> */
{
	return With(target, env =>
	{
		/* @flow-off */
		return assign({}, env, { buckets: env.src.partial(env.buckets_path) })
	})
}
