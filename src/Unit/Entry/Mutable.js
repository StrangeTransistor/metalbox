/* @flow */

import Entry from '../../Entry'
import Unit from '../Unit'

export default function Mutable
	/* ::<$in, $prov: $Providers$Base, $out> */
(
	unit /* :$Thru<$in, $prov, $out> */
)
	/* :$Thru<$Mutable<$in>, $prov, $Mutable<$out>> */
{
	return Unit(async (entry /* :$Entry<$Mutable<$in>> */, context) =>
	{
		if (entry.content === Entry.Remove)
		{
			/* @flow-off */
			var remove = (entry /* :$Entry<$Remove> */)

			console.log('PASS THRU Remove')

			return remove
		}
		else
		{
			/* @flow-off */
			var context_clean = (context /* :$Context<$Entry<$in>, $prov> */)

			/* TODO: compose outcome */
			var outcome = unit(context_clean)

			/* @flow-off */
			var output /* :$Entry<$Mutable<$out>> */ = await outcome.output

			console.log('PASS output', output)

			return output
		}
	})
}
