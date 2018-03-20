/* @flow */

var assign = Object.assign

import def from 'def-prop'
import { val } from 'def-prop'

export default function Providers /* ::<$base: $Providers$Base> */
(
	/* @flow-off */
	base /* :$base */ = ({} /* :$Providers$Base */)
)
	/* :$Providers<$base> */
{
	base = assign({}, base)

	def(base, 'derive', val(derive))

	function derive /* ::<$derive: $Providers$Base> */
	(
		providers /* :$derive */
	)
		/* :Providers<$base & $derive> */
	{
		return Providers(assign({}, base, providers))
	}

	return base
}
