/* @flow */

var noop = () => {}

import { on } from 'flyd'
import { combine } from 'flyd'

import stream_to from '../../flyd/stream-to'
import backpressure from '../../flyd/backpressure'

export default function proceed
	/* ::<$prov: $Providers$Base, $medium, $medium_in, $out> */
(
	prev_out /* :$Outcome<$medium> */,
	next     /* :$Unit<$medium_in, $prov, $out> */,
	fn       /* :($medium) => $Context<$medium_in, $prov> */
)
{
	/* @flow-off */
	var prev_stream /* :flyd$Stream<$medium> */ = prev_out.stream
	var prev = backpressure(prev_stream)

	var stream = combine(handle, [ prev ])

	prev.continue()

	function handle (_, self)
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
			var output = next(context_live).output

			stream_to(output, self).then(prev.continue)
			// out2.stream +
		}
	}

	on(prev.end, stream.end)
	// out2.stream +

	prev_out.output.catch(noop)

	return stream
}
