/* @flow */

export default function end (outcome /* :$Outcome<*> */)
{
	setTimeout(() =>
	{
		/* @flow-off */
		outcome.stream.end(true)
	}
	, 200)
}
