/* @flow */

import { on } from 'flyd'

import Unit from '../Unit'

export default function Pipe
	/* ::<$in, $prov: $Providers$Base, $medium, $out> */
(
	u1 /* :$Unit<$in,     $prov, $medium>  */,
	u2 /* :$Unit<$medium, $prov, $out>     */
)
	/* :$Unit<$in, $prov, $out> */
{
	/* TODO: compose outcome (children, named?) */
	return Unit((_, context) =>
	{
		var out1 = u1(context)

		if (out1.stream)
		{
			var stream = out1.stream.map(output =>
			{
				/* @flow-off */
				return (u2(context.derive(output)).output /* :$out */)
			})

			/* @flow-off */
			on(out1.stream.end, stream.end)

			return stream
		}
		else
		{
			var promise = out1.output.then(output =>
			{
				return u2(context.derive(output)).output
			})

			return promise
		}
	})
}
