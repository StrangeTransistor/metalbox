/* @flow */

import Unit from '../Unit'

export default function Precursor /* ::<$in, $prov: $Providers$Base, $out> */
(
	u1 /* :$Unit<$in, $prov, any>  */,
	u2 /* :$Unit<$in, $prov, $out> */
)
	/* :$Unit<$in, $prov, $out> */
{
	return Unit((_, context) =>
	{
		var u = u1.pipe(Unit(() => context.input)).pipe(u2)

		var outcome = u(context)

		return outcome.stream || outcome.output
	})
}
