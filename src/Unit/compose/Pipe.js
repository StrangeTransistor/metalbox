/* @flow */

import Unit from '../Unit'

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
		var output = await u1(context).output

		var output_next = await u2(context.derive(output)).output

		/* TODO: compose outcome (children, named?) */
		return output_next
	})
}
