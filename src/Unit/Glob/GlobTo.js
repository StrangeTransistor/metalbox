/* @flow */

var assign = Object.assign

import { find } from 'globule'

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

	return Unit(async (_, context) =>
	{
		/* @flow-off */
		// var s /* :flyd$Stream<$out> */ = stream()

		var Σglob = await unroll(context, glob)

		Σglob = [].concat(Σglob)

		var found = find(Σglob, options)
		var entries = found.map(filename => Entry(filename))

		/* TODO: compose result */
		/* TODO: Identity mismatch */
		/* @flow-off */
		var result = Σunit(context.derive(entries))

		return ((result.alive() /* :any */) /* :$out */)
	})
}
