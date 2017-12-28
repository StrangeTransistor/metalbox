/* @flow */

import bluebird from 'bluebird'
var resolve = bluebird.resolve

export default function Outcome /* ::<$out> */
(
	output /* :$Promisable<$out> */
)
	/* :$Outcome<$out> */
{
	var outcome =
	{
		output: resolve(output),
	}

	return outcome
}
