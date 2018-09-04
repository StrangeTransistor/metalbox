/* @flow */

var assign = Object.assign
var keys   = Object.keys

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
	def(base, 'is_empty', val(is_empty))

	function derive /* ::<$derive: $Providers$Base> */
	(
		providers /* :$derive */
	)
		/* :Providers<$base & $derive> */
	{
		return Providers(assign({}, base, providers))
	}

	function is_empty ()
	{
		return (keys(base).length === 0)
	}

	return base
}
