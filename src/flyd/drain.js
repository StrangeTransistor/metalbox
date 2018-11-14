/* @flow */

import Promise from 'bluebird'

import onto from './onto'

export default function drain /* ::<$value> */
(
	stream /* :flyd$Stream<$value> */
)
	/* :Promise<$value> */
{
	return new Promise(rs =>
	{
		onto(stream.end, () => rs(stream()))
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

	onto(stream, (value) => buffer.push(value))

	return drain(stream).then(() => buffer)
}
