/* @flow */

import Unit from '../Unit'

import Context from '../../Context'

export default function Pipe
	/* ::<$in, $prov: $Providers$Base, $medium, $out> */
(
	u1 /* :$Unit<$in,     $prov, $medium>  */,
	u2 /* :$Unit<$medium, $prov, $out>     */
)
	/* :$Unit<$in, $prov, $out> */
{
	return Unit(async (_, context) =>
	{
		var outcome = await u1(context)

		var outcome_next = await u2(Context(outcome.output))

		/* TODO: compose context */
		return outcome_next.output
	})
}
