/* @flow */

import Unit from '../Unit'

import proceed from './proceed'

export default function Precursor
	/* ::<$in, $prov: $Providers$Base, $out> */
(
	u1 /* :$Unit<$in, $prov, any>  */,
	u2 /* :$Unit<$in, $prov, $out> */
)
	/* :$Unit<$in, $prov, $out> */
{
	return Unit((_, context) =>
	{
		var out1 = u1(context)

		if (out1.stream)
		{
			var context_live = context.derive(context.input)

			return proceed(out1, u2, () => context_live)
		}
		else
		{
			return out1.output.then(() =>
			{
				return u2(context).output
			})
		}
	})
}
