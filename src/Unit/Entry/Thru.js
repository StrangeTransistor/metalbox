/* @flow */

import Unit from '../Unit'
import Entry from '../../Entry'

export default function Thru
	/* ::<$in, $prov: $Providers$Base, $out> */
(
	fn /* :$Thru$Fn<$in, $prov, $out> */
)
	/* :$Thru<$in, $prov, $out> */
{
	return Unit(
	{
		family: 'Thru',

		async unit (entry, context)
		{
			var content = entry.content

			var Σcontent = await fn(content, context)

			return Entry(entry.filename, Σcontent)
		}
	})
}
