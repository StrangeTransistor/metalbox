/* @flow */

import time from '../time'

import capture from './capture'

export default function Outcome /* ::<$out> */
(
	output /* :$Streaming<$out> */
)
	/* :$Outcome<$out> */
{
	var [ promise, stream ] = capture(output)

	promise = promise.finally(() =>
	{
		outcome.time.taken = time(outcome.time.start)
		outcome.time.stop  = time()
	})

	var outcome =
	{
		stream,
		output: promise,
		return: (stream || promise),

		time:
		{
			start: time(),
			/* @flow-off */
			stop:  (null /* :$Hrtime */),
			/* @flow-off */
			taken: (null /* :$Hrtime */),
		}
	}

	return outcome
}
