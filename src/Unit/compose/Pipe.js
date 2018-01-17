/* @flow */

var noop = () => {}

import { on } from 'flyd'
import { combine } from 'flyd'

import Unit from '../Unit'

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
			var stream = combine(handle, [ out1.stream ])

			function handle (prev, self)
			{
				var value = prev()

				if (value instanceof Error)
				{
					self(value)
				}
				else
				{
					var context_live  = context.derive(value)
					context_live.live = true

					/* TODO: stream in stream */
					u2(context_live).output
					.catch((error) =>
					{
						if (! (error instanceof Error)) error = Error(error)

						return error
					})
					.then(self)
					// out2.stream +
				}
			}

			/* @flow-off */
			on(out1.stream.end, stream.end)
			// out2.stream +

			out1.output.catch(noop)

			return stream
		}
		else
		{
			return out1.output.then(output =>
			{
				return u2(context.derive(output)).output
			})
		}
	})
}
