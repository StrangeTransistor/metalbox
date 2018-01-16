/* @flow */

var noop = () => {}

import { on } from 'flyd'
import { combine } from 'flyd'

import Unit from '../Unit'

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
			var context_live  = context.derive(context.input)
			context_live.live = true

			/* @flow-off */
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
			return out1.output.then(() =>
			{
				return u2(context).output
			})
		}
	})
}
