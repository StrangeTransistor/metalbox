/* @flow */

import Unit from '../Unit'

export default function Precursor /* ::<$in, $prov: $Providers$Base, $out> */
(
	u1 /* :$Unit<$in, $prov, any>  */,
	u2 /* :$Unit<$in, $prov, $out> */
)
	/* :$Unit<$in, $prov, $out> */
{
	return Unit(async (context) =>
	{
		await u1(context)

		var outcome = await u2(context)

		/* TODO: compose context */
		return outcome.output
	})
}
