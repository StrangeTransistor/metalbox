/* @flow */

var assign = Object.assign
var keys   = Object.keys

import def from 'def-prop'
import { val } from 'def-prop'

/* ::

declare function Providers<$base: $Providers$Base> ($base): $Providers<$base>
declare function Providers (): $Providers<{||}>

*/

export default function Providers (base)
{
	base = assign({}, base)

	def(base, 'derive', val(derive))
	def(base, 'is_empty', val(is_empty))

	function derive (providers)
	{
		return Providers(assign({}, base, providers))
	}

	function is_empty ()
	{
		return (keys(base).length === 0)
	}

	return base
}
