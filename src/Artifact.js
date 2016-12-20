/* @flow */

module.exports
= function Artifact
(
	do_construct /* :DoConstruct */
)
	/* :Artifact */
{
	var artifact = {}

	artifact.construct = resolver(do_construct)

	return artifact
}

function resolver (fn)
{
	return function ()
	{
		return new Promise(rs =>
		{
			rs(fn.apply(this, arguments))
		})
	}
}
