/* @flow */

import { isStream as is_stream } from 'flyd'

import Promise from 'bluebird'
var resolve = Promise.resolve

import drain from '../drain'

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

		return [ drain(stream), stream ]
	}
	else
	{
		return [ resolve(value), null ]
	}
}
