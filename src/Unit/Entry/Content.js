/* @flow */
/* ::

type $Content$Fn<$prov: $Providers$Base>
= $Producer<[ string, $Context<$Entry<$File>, $prov> ], string>

*/

import Unit from '../Unit'
import Entry from '../../Entry'

export default function Content /* ::<$prov: $Providers$Base> */
(
	fn /* :$Content$Fn<$prov> */
)
	/* :$Thru<$File, $prov, $File> */
{
	return Unit(
	{
		family: 'Content',

		async unit (entry, context)
		{
			var content = entry.content.content

			// TODO: sourcemaps
			content = await fn(content, context)

			return Entry(entry.filename,
			{
				content,
				sourcemap: entry.content.sourcemap,
			})
		}
	})
}
