/* @flow */

var assign = Object.assign

export default function Providers /* ::<$base: $Providers$Base> */
(
	base /* :$base */
)
	/* :$Providers<$base> */
{
	base = assign({}, base)

	base.extend = function extend /* ::<$extend: $Providers$Base> */
	(
		providers /* :$extend */
	)
		/* :Providers<$base & $extend> */
	{
		return Providers(assign(base, providers))
	}

	return base
}
