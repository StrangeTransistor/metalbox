/* @flow */

import Promise from 'bluebird'

import { on }  from 'flyd'

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
	return drain(stream)
	.then(value =>
	{
		if (value instanceof Error)
		{
			throw value
		}

		return value
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

	return drain(stream).then(() => buffer)
}
