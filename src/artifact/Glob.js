/* @flow */

var find = require('globule').find
var cp = require('fs-sync').copy

var Artifact = require('./Artifact')

module.exports = function Glob /* ::<Env: EnvRelease>*/
(
	src  /* :string */,
	glob /* :string | string[] */,
	dst  /* :string */
)
	/* :T_Artifact<Env> */
{
	return Artifact(env =>
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
}
