/* @flow */
// TODO: sourcemaps
/* ::

type $Content$Fn<$prov: $Providers$Base>
= $Producer<[ string, $Context<$Entry<$File>, $prov> ], string>

*/

import Thru from './Thru'

export default function Content /* ::<$prov: $Providers$Base> */
(
	fn /* :$Content$Fn<$prov> */
)
	/* :$Thru<$File, $prov, $File> */
{
	return Thru(async ({ content, sourcemap }, context) =>
	{
		content = await fn(content, context)

		return { content, sourcemap }
	})
}
