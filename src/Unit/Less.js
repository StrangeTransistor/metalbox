/* @flow */

import less from 'less'

import Unit  from '../Unit'
import Entry from '../Entry'

export default function Less
	/* ::<$in: $Entry<$File>, $prov: $Providers$Base> */
()
	/* :$Unit<$in, $prov, $Entry<$File>> */
{
	return Unit(async (entry) =>
	{
		var filename = entry.filename
		var content  = entry.content.content

		var bundle = await less.render(content,
		{
			filename,
		})

		return Entry(entry.filename,
		{
			content:   bundle.css,
			sourcemap: bundle.map,
		})
	})
}
