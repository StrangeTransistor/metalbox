/* @flow */

import Unit from '../Unit'

import proceed from './proceed'

export default function Pipe
	/* ::<$in, $prov: $Providers$Base, $medium, $out> */
(
	u1 /* :$Unit<$in,     $prov, $medium>  */,
	u2 /* :$Unit<$medium, $prov, $out>     */
)
	/* :$Unit<$in, $prov, $out> */
{
	return Unit((_, context) =>
	{
		var out1 = u1(context)

		if (out1.stream)
		{
			return proceed(out1, u2, context.derive)
		}
		else
		{
			return out1.output
			.then(context.derive)
			.then(u2)
			.then(outcome => outcome.output)
		}
	})
}
