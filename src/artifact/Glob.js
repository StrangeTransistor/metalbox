/* @flow */

var find = require('globule').find
var cp = require('fs-sync').copy

var Artifact = require('./Artifact')

module.exports = function Glob /* ::<Env: EnvRelease>*/
(
	from /* :string */,
	glob /* :string | string[] */,
	to   /* :string */
)
	/* :T_Artifact<Env> */
{
	return Artifact(env =>
	{
		var r_in  = env.in.partial(from)
		var r_out = env.out.partial(to)

		find(r_in(glob))
		.map(path => r_in.relative(path))
		.map(path =>
		{
			cp(r_in(path), r_out(path), { force: true })
		})
	})
}
