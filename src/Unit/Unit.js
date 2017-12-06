/* @flow */

import Pipe from './compose/Pipe'
import Precursor from './compose/Precursor'

export default function Unit /* ::<$in, $out> */
(
	fn /* :$Unit$Fn<$in, $out> */
)
	/* :$Unit<$in, $out> */
{
	var unit = async function (context)
	{
		return { output: await fn(context) }
	}

	unit.pipe = function pipe /* ::<$out_next> */
	(
		next /* :$Unit<$out, $out_next> */
	)
		/* :$Unit<$in, $out_next> */
	{
		return Pipe(unit, next)
	}

	unit.pre = function pre /* ::<$out_next> */
	(
		next /* :$Unit<$in, $out_next> */
	)
		/* :$Unit<$in, $out_next> */
	{
		return Precursor(unit, next)
	}

	return unit
}
