/* @flow */

import bluebird from 'bluebird'
var resolve = bluebird.resolve

export default function stream_to /* ::<$value> */
(
	value  /* :$Promisable<$value> */,
	stream /* :flyd$Stream<$value> */
)
	/* :flyd$Stream<$value> */
{
	resolve(value).catch(error =>
	{
		if (! (error instanceof Error)) error = Error(error)

		return error
	})
	.then(stream)

	return stream
}
