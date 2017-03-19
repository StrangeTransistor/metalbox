/* @flow */

module.exports = function label /* ::<Env> */
(
	label /* :string */,
	artifact /* :T_Artifact<Env> */
)
	/* :T_Artifact<Env> */
{
	artifact.describe = () =>
	{
		return `[${label}]`
	}

	return artifact
}
