/* @flow */

var assign = Object.assign

import { find } from 'globule'

import { stream } from 'flyd'
import { on } from 'flyd'

import turnoff from '../../flyd/turnoff'

import unroll from '../../unroll'
import Entry  from '../../Entry'

import Unit from '../Unit'
import cast from '../_/cast'

export default function Glob /* ::<$in, $prov: $Providers$Base, $out> */
(
	glob /* :$Computable<$in, $prov, $Glob> */,
	unit /* :: ?:?$Unit<$Entries<void>, $prov, $out> */,
	options /* :: ?:$Shape<$Glob$Options> */
)
	/* :$Unit<$in, $prov, $out> */
{
	var Σunit = cast(unit)
	options = assign({}, options)

	return Unit((_, context) =>
	{
		/* @flow-off */
		var s /* :flyd$Stream<$out> */ = stream()

		unroll(context, glob)
		.then(glob =>
		{
			glob = [].concat(glob)

			var found = find(glob, options)
			var entries = found.map(filename => Entry(filename))

			/* TODO: compose result */
			/* TODO: Identity mismatch */
			/* @flow-off */
			var result = Σunit(context.derive(entries))

			var a = result.alive()
			on(s, a)

			turnoff(a, s)
			turnoff(s, a)
		})

		return s
	})
}
