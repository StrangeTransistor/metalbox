/* @flow */

export default function end (result /* :$Result<any> */)
{
	setTimeout(() =>
	{
		/* @flow-off */
		result.stream.end(true)
	}
	, 200)
}
