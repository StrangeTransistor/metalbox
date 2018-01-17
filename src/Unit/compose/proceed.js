/* @flow */

var noop = () => {}

import { on } from 'flyd'
import { combine } from 'flyd'

export default function proceed
	/* ::<$prov: $Providers$Base, $medium, $medium_in, $out> */
(
	prev_out /* :$Outcome<$medium> */,
	next     /* :$Unit<$medium_in, $prov, $out> */,
	fn       /* :($medium) => $Context<$medium_in, $prov> */
)
{
	/* @flow-off */
	var stream = combine(handle, [ prev_out.stream ])

	function handle (prev, self)
	{
		var value = prev()

		if (value instanceof Error)
		{
			self(value)
		}
		else
		{
			var context_live = fn(value)
			context_live.live = true

			/* TODO: stream in stream */
			next(context_live).output
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
	on(prev_out.stream.end, stream.end)
	// out2.stream +

	prev_out.output.catch(noop)

	return stream
}
