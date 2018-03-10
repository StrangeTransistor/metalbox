/* @flow */

import Unit  from '../Unit'
import Entry from '../Entry'

export default function FlowDecl /* ::<$content, $prov: $Providers$Base> */ ()
	/* :$Unit<$Entry<$content>, $prov, $Entry<$content>> */
{
	return Unit(entry =>
	{
		var filename = entry.filename

		filename = filename + '.flow'

		return Entry(filename, entry.content)
	})
}
