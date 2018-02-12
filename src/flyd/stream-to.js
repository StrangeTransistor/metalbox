/* @flow */

export default function stream_to /* ::<$value> */
(
	value    /* :Promise<$value> */,
	stream   /* :flyd$Stream<$value> */,
	finalize /* ::?: boolean */
)
	/* :Promise<void> */
{
	return value.catch(error =>
	{
		if (! (error instanceof Error)) error = Error(error)

		return error
	})
	.then(stream)
	.then(() =>
	{
		if (finalize)
		{
			stream.end(true)
		}
	})
}
