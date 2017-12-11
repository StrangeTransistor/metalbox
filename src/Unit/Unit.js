/* @flow */

import Pipe from './compose/Pipe'
import Precursor from './compose/Precursor'

export default function Unit /* ::<$in, $prov: $Providers$Base, $out> */
(
	fn /* :$Unit$Fn<$in, $prov, $out> */
)
	/* :$Unit<$in, $prov, $out> */
{
	var unit = async function (context)
	{
		return { output: await fn(context) }
	}

	unit.pipe = function pipe /* ::<$out_next> */
	(
		next /* :$Unit<$out, $prov, $out_next> */
	)
		/* :$Unit<$in, $prov, $out_next> */
	{
		return Pipe(unit, next)
	}

	unit.pre = function pre /* ::<$out_next> */
	(
		next /* :$Unit<$in, $prov, $out_next> */
	)
		/* :$Unit<$in, $prov, $out_next> */
	{
		return Precursor(unit, next)
	}

	return unit
}
