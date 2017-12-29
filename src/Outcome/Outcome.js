/* @flow */

import capture from './capture'

export default function Outcome /* ::<$out> */
(
	output /* :$Outcome$Value<$out> */
)
	/* :$Outcome<$out> */
{
	var [ promise, stream ] = capture(output)

	var outcome =
	{
		stream,
		output: promise,
	}

	return outcome
}
