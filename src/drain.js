/* @flow */

import Promise from 'bluebird'

import { on }  from 'flyd'
import { combine } from 'flyd'

export default function drain /* ::<$value> */
(
	stream /* :flyd$Stream<$value> */
)
	/* :Promise<$value> */
{
	return new Promise(rs =>
	{
		on(() => rs(stream()), stream.end)
	})
}

export function either /* ::<$value, $error: Error> */
(
	stream /* :flyd$Stream<$value | $error> */
)
	/* :Promise<$value> */
{
	return new Promise((rs, rj) =>
	{
		on(decide, stream.end)

		function decide ()
		{
			var value = stream()

			if (value instanceof Error)
			{
				rj(value)
			}
			else
			{
				rs(value)
			}
		}
	})
}


export function finalize /* ::<$value> */
(
	stream /* :flyd$Stream<$value> */
)
	/* :flyd$Stream<$value> */
{
	return combine(handle, [ stream ])

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
