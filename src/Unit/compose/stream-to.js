/* @flow */

export default function stream_to /* ::<$value> */
(
	value  /* :Promise<$value> */,
	stream /* :flyd$Stream<$value> */
)
	/* :flyd$Stream<$value> */
{
	value.catch(error =>
	{
		if (! (error instanceof Error)) error = Error(error)

		return error
	})
	.then(stream)

	return stream
}
