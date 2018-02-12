/* @flow */

import { combine } from 'flyd'

import turnoff from './turnoff'

export default function finalize /* ::<$value> */
(
	stream /* :flyd$Stream<$value> */
)
	/* :flyd$Stream<$value> */
{
	var stream_finalized = combine(handle, [ stream ])

	turnoff(stream_finalized, stream)

	return stream_finalized

	function handle (stream, self)
	{
		var value = stream()

		self(value)

		if (value instanceof Error)
		{
			self.end(true)
		}
	}
}
