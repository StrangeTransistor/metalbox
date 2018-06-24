/* @flow */
/* ::

type $Rename$Fn<$content, $prov: $Providers$Base>
= $Producer<[ string, $Context<$Entry<$content>, $prov> ], string>

*/

import Unit from '../Unit'
import Entry from '../../Entry'

export default function Rename /* ::<$content, $prov: $Providers$Base> */
(
	fn /* :$Rename$Fn<$content, $prov> */
)
	/* :$Thru<$content, $prov, $content> */
{
	return Unit(
	{
		family: 'Rename',

		async unit (entry, context)
		{
			var filename = entry.filename

			filename = await fn(filename, context)

			return Entry(filename, entry.content)
		}
	})
}
