/* @flow */

import { on }  from 'flyd'
import { combine } from 'flyd'

export default function finalize /* ::<$value> */
(
	stream /* :flyd$Stream<$value> */
)
	/* :flyd$Stream<$value> */
{
	var stream_f = combine(handle, [ stream ])

	on(stream.end, stream_f.end)

	return stream_f

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
