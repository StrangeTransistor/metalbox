/* @flow */

import Unit from '../Unit'

export default function Precursor /* ::<$in, $out> */
(
	u1 /* :$Unit<$in, any>  */,
	u2 /* :$Unit<$in, $out> */
)
	/* :$Unit<$in, $out> */
{
	return Unit(async (context) =>
	{
		await u1(context)

		var outcome = await u2(context)

		/* TODO: compose context */
		return outcome.output
	})
}
