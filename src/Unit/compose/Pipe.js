/* @flow */

import Unit from '../Unit'

import Context from '../../Context'

export default function Pipe /* ::<$in, $medium, $out> */
(
	u1 /* :$Unit<$in, $medium>  */,
	u2 /* :$Unit<$medium, $out> */
)
	/* :$Unit<$in, $out> */
{
	return Unit(async (context) =>
	{
		var outcome = await u1(context)

		var outcome_next = await u2(Context(outcome.output))

		/* TODO: compose context */
		return outcome_next.output
	})
}
