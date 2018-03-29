/* @flow */
/* ::

type $Glob$Options = Object

*/

var assign = Object.assign

import { find } from 'globule'

import { stream } from 'flyd'
import { on } from 'flyd'

import alive   from '../../Outcome/alive'
import turnoff from '../../flyd/turnoff'

import unroll from '../../unroll'
import Entry  from '../../Entry'

import Unit from '../Unit'

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

		unroll(context, glob)
		.then(glob =>
		{
			glob = [].concat(glob)

			var found = find(glob, options)
			var entries = found.map(filename => Entry(filename))

			/* TODO: compose outcome */
			var outcome = unit(context.derive(entries))

			var a = alive(outcome)
			on(s, a)

			turnoff(a, s)
			turnoff(s, a)
		})

		return s
	})
}
