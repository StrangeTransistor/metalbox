/* @flow */

var assign = Object.assign

export default function Providers /* ::<$base: $Providers$Base> */
(
	base /* :$base */
)
	/* :$Providers<$base> */
{
	base = assign({}, base)

	base.derive = function derive /* ::<$derive: $Providers$Base> */
	(
		providers /* :$derive */
	)
		/* :Providers<$base & $derive> */
	{
		return Providers(assign({}, base, providers))
	}

	return base
}
