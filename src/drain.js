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

export function concat /* ::<$value> */
(
	stream /* :flyd$Stream<$value> */
)
	/* :Promise<$value[]> */
{
	var buffer /* :$value[] */ = []

	on(push, stream)

	function push (value)
	{
		buffer.push(value)
	}

	return new Promise(rs =>
	{
		on(rs, stream.end)
	})
	.then(() => buffer)
}


export function finalize /* ::<$value> */
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