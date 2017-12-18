/* @flow */
/* ::

type $Entries<$content> = Array<$Entry<$content>>

type $Glob$Glob = string | string[]

type $Glob$Options = Object

*/

var assign = Object.assign

import { find } from 'globule'

import unroll from '../unroll'

import Entry from '../Entry'

import Unit from './Unit'

export default function Glob /* ::<$in, $prov: $Providers$Base, $out> */
(
	glob /* :$Computable<$in, $prov, $Glob$Glob> */,
	unit /* :$Unit<$Entries<void>, $prov, $out> */,
	options /* :: ?:$Shape<$Glob$Options> */
)
	/* :$Unit<$in, $prov, $out> */
{
	options = assign({}, options)

	return Unit(async (_, context) =>
	{
		var Σglob = await unroll(context, glob)
		Σglob = [].concat(Σglob)

		var found = find(Σglob, options)
		var entries = found.map(filename => Entry(filename))

		/* TODO: compose outcome */
		var outcome = await unit(context.derive(entries))
		return outcome.output
	})
}

Glob.Each = function /* ::<$in, $prov: $Providers$Base, $out> */
(
	glob /* :$Computable<$in, $prov, $Glob$Glob> */,
	unit /* :$Unit<$Entry<void>, $prov, $out> */,
	options /* :: ?:$Shape<$Glob$Options> */
)
	/* :$Unit<$in, $prov, $out[]> */
{
	var each = Unit(async (entries, context) =>
	{
		var outputs /* :$out[] */ = []

		for (let entry of entries)
		{
			/* TODO: compose outcome */
			var outcome = await unit(context.derive(entry))

			outputs.push(outcome.output)
		}

		return outputs
	})

	return Glob(glob, each, options)
}
