/* @flow */

import { on } from 'flyd'
import { isStream as is_stream } from 'flyd'

import Promise from 'bluebird'
var resolve = Promise.resolve

export default function capture /* ::<$out> */
(
	value /* :$Outcome$Value<$out> */
)
	/* :[ Promise<$out>, flyd$Stream<$out> | null ] */
{
	if (is_stream(value))
	{
		/* @flow-off */
		var stream /* :flyd$Stream<$out> */ = value

		if (stream.hasVal)
		{
			var promise /* :Promise<$out> */ = resolve(stream())
		}
		else
		{
			var promise /* :Promise<$out> */ = new Promise(rs =>
			{
				on(() => rs(stream()), stream.end)
			})
		}

		return [ promise, stream ]
	}
	else
	{
		return [ resolve(value), null ]
	}
}
