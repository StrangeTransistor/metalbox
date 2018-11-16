/* @flow */

import Promise from 'bluebird'
var map = Promise.mapSeries

import { stream } from 'flyd'

import stream_to from '../../flyd/stream-to'

import Unit from '../Unit'
import cast from '../_/cast'

import GlobTo from './GlobTo'

export default function /* ::<$in, $prov: $Providers$Base, $out> */
(
	glob /* :$Computable<$in, $prov, $Glob> */,
	unit /* :: ?:?$Unit<$Entry<$Supertype<void>>, $prov, $out> */,
	options /* :: ?:$Shape<$Glob$Options> */
)
	/* :$Unit<$in, $prov, $out> */
{
	var Σunit = cast(unit)

	var each = Unit((entries, context) =>
	{
		var s /* :flyd$Stream<$out> */ = stream()

		map(entries, entry =>
		{
			if (s.end())
			{
				return
			}

			// TODO: stream in stream
			var output = Σunit(context.derive(entry)).promise

			return stream_to(output, s)
		})
		.then(() => s.end(true))

		return s
	})

	return GlobTo(glob, each, options)
}
