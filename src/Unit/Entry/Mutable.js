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

			return remove
		}
		else
		{
			/* @flow-off */
			var context_clean /* :$Context<$Entry<$in>, $prov> */ = context

			/* TODO: compose outcome */
			var outcome = unit(context_clean)

			/* @flow-off */
			var output /* :$Entry<$Mutable<$out>> */ = await outcome.output

			return output
		}
	})
}
