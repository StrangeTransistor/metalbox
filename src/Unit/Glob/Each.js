/* @flow */
/* ::

type $Glob$Options = Object

*/

import Promise from 'bluebird'
var map = Promise.mapSeries

import { stream } from 'flyd'

import stream_to from '../../flyd/stream-to'

import Unit from '../Unit'

import Glob from './Glob'

export default function /* ::<$in, $prov: $Providers$Base, $out> */
(
	glob /* :$Computable<$in, $prov, $Glob> */,
	unit /* :$Unit<$Entry<void>, $prov, $out> */,
	options /* :: ?:$Shape<$Glob$Options> */
)
	/* :$Unit<$in, $prov, $out> */
{
	var each = Unit((entries, context) =>
	{
		/* @flow-off */
		var s /* :flyd$Stream<$out> */ = stream()

		map(entries, entry =>
		{
			if (s.end())
			{
				return
			}

			// TODO: stream in stream
			var output = unit(context.derive(entry)).output

			return stream_to(output, s)
		})
		.then(() => s.end(true))

		return s
	})

	return Glob(glob, each, options)
}
