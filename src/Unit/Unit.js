/* @flow */

import Context from '../Context'

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

	/* TODO: experimental, test for viability */
	unit.before = function before /* ::<$in_before> */
	(
		map /* :$Unit<$in_before, $in> */
	)
		/* :$Unit<$in_before, $out> */
	{
		return Pipe(map, unit)
	}

	return unit
}

function Pipe /* ::<$in, $mid, $out> */
(
	u1 /* :$Unit<$in, $mid>  */,
	u2 /* :$Unit<$mid, $out> */
)
	/* :$Unit<$in, $out> */
{
	return Unit(async (context) =>
	{
		var outcome = await u1(context)

		var outcome_next = await u2(Context(outcome.output))

		return outcome_next.output
	})
}
