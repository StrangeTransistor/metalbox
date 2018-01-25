/* @flow */
/* ::

type $Glob$Options = Object

*/

var assign = Object.assign

import { find } from 'globule'

import Promise from 'bluebird'
var resolve = Promise.resolve
var map = Promise.mapSeries

import { stream } from 'flyd'
import { on } from 'flyd'
import stream_to from './compose/stream-to'
import alive from './compose/alive'

import unroll from '../unroll'

import Entry from '../Entry'

import Unit from './Unit'

export default function Glob /* ::<$in, $prov: $Providers$Base, $out> */
(
	glob /* :$Computable<$in, $prov, $Glob> */,
	unit /* :$Unit<$Entries<void>, $prov, $out> */,
	options /* :: ?:$Shape<$Glob$Options> */
)
	/* :$Unit<$in, $prov, $out> */
{
	options = assign({}, options)

	return Unit((_, context) =>
	{
		/* @flow-off */
		var s /* :flyd$Stream<$out> */ = stream()

		resolve(unroll(context, glob))
		.then(glob =>
		{
			glob = [].concat(glob)

			var found = find(glob, options)
			var entries = found.map(filename => Entry(filename))

			/* TODO: compose outcome */
			var outcome = unit(context.derive(entries))

			var a = alive(outcome.stream || outcome.output)
			on(s, a)
			on(s.end, a.end)
		})

		return s
	})
}

Glob.Each = function /* ::<$in, $prov: $Providers$Base, $out> */
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
			// TODO: stream in stream
			var output = unit(context.derive(entry)).output

			stream_to(output, s)

			return output
		})
		.delay(0) /* defer */
		.finally(() => s.end(true))

		return s
	})

	return Glob(glob, each, options)
}
