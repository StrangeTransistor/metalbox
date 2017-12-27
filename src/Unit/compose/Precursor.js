/* @flow */

import Unit from '../Unit'

export default function Precursor /* ::<$in, $prov: $Providers$Base, $out> */
(
	u1 /* :$Unit<$in, $prov, any>  */,
	u2 /* :$Unit<$in, $prov, $out> */
)
	/* :$Unit<$in, $prov, $out> */
{
	return Unit(async (_, context) =>
	{
		await u1(context).output

		var output = await u2(context).output

		/* TODO: compose outcome */
		return output
	})
}
