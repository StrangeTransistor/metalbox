/* @flow */

var assign = Object.assign

export default function Providers /* ::<$base: Object> */
(
	base /* :$base */
)
	/* :$Providers<$base> */
{
	base = assign({}, base)

	base.extend = function extend /* ::<$extend: Object> */
	(
		providers /* :$extend */
	)
		/* :Providers<$base & $extend> */
	{
		return Providers(assign(base, providers))
	}

	return base
}
