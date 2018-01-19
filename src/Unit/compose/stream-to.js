/* @flow */

import bluebird from 'bluebird'
var resolve = bluebird.resolve

export default function stream_to /* ::<$value> */
(
	value  /* :$Promisable<$value> */,
	stream /* :($value) => any */
)
	/* :void */
{
	resolve(value).catch(error =>
	{
		if (! (error instanceof Error)) error = Error(error)

		return error
	})
	.then(stream)
}
