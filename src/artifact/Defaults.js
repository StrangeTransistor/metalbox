/* @flow */

var With = require('./With')

module.exports = function Defaults
/* ::
<
	Defaults: Object,
	OuterEnv: Object,
	InnerEnv: OuterEnv & Defaults
>
*/
(
	defaults /* :Defaults */,
	release  /* :T_Artifact<InnerEnv> */
)
	/* :T_Artifact<OuterEnv> */
{
	return With(release, (env /* :OuterEnv */) /* :InnerEnv */ =>
	{
		/* @flow-off */
		return Object.assign({}, defaults, env)
	})
}
