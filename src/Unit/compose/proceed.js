/* @flow */

import { combine } from 'flyd'

import stream_to from '../../flyd/stream-to'
import backpressure from '../../flyd/backpressure'
import turnoff from '../../flyd/turnoff'

export default function proceed
	/* ::<$prov: $Providers$Base, $medium, $medium_in, $out> */
(
	r    /* :$Result<$medium> */,
	next /* :$Unit<$medium_in, $prov, $out> */,
	fn   /* :($medium) => $Context<$medium_in, $prov> */
)
{
	var prev = backpressure(r.alive())

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
			var context = fn(value)

			/* TODO: stream in stream */
			// out2.stream +
			var r2 = next(context)

			stream_to(r2.promise, self)
			.then(prev.continue)
		}
	}

	turnoff(stream, prev)
	// out2.stream +

	return stream
}
