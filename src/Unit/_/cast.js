/* @flow */
/* ::

declare function cast
<$in, $prov: $Providers$Base, $out>
(?$Unit<$in, $prov, $out>): $Unit<$in, $prov, $out | $in>

declare function cast
<$in, $prov: $Providers$Base, $out, $Fn: $Unit$Fn<$in, $prov, $out>>
(?$Fn): $Unit<$in, $prov, $out | $in>

*/

import Unit from '../Unit'
import Identity from '../Identity'

export default function cast (unit /* :any */)
{
	if (! unit)
	{
		return Identity()
	}
	else if (Unit.is(unit))
	{
		return unit
	}
	else if (typeof unit === 'function')
	{
		return Unit(unit)
	}
	else
	{
		throw new TypeError('cannot_cast_unit')
	}
}
