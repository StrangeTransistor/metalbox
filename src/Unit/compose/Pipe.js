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
		var r1 = u1(context)

		return proceed(r1, u2, context.derive)
	})
}
